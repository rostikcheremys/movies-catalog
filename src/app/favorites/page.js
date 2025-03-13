'use client';

import { useEffect, useState } from "react";
import { getUserFavorites } from "@/app/favorites/components/favorites";
import LoadingSpinner from "@/app/movie/components/LoadingSpinner";
import ImageCard from "@/app/movie/components/ImageCard";
import VoteAverage from "@/app/movie/components/VoteAverage";
import Title from "@/app/movie/components/Title";
import Favorites from "@/app/movie/components/Favorites";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/profile/components/useUser";

export default function FavoritePage() {
    const [loading, setLoading] = useState(true);
    const [favorites, setFavorites] = useState([]);
    const { user } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (user) {
            const fetchFavorites = async () => {
                const fetchedFavorites = await getUserFavorites(user.id);
                setFavorites(fetchedFavorites);
                setLoading(false);
            };

            fetchFavorites();
        } else {
            setLoading(false);
        }
    }, [user]);

    const handleCardClick = (id, mediaType) => {
        const validMediaTypes = ["movie", "tv"];
        if (validMediaTypes.includes(mediaType)) {
            router.push(`/${mediaType}/${id}`);
        } else {
            router.push("/not-found");
        }
    };

    if (loading) return <LoadingSpinner />;

    return (
        <div>
            <h2>Улюблене</h2>
            {favorites.length === 0 ? (
                <p>Список улюблених порожній.</p>
            ) : (
                <div>
                    <div className="row row-cols-1 row-cols-md-4 g-4">
                        {favorites.map((item) => (
                            <div key={item.item_id} className="col" onClick={() => handleCardClick(item.item_id, item.item_type)}>
                                <div className="card">
                                    <ImageCard item={{ poster_path: item.image, title: item.title }} customClass="img-card" scrollToTrailer={null} />
                                    <VoteAverage item={{ vote_average: item.vote_average }} />
                                    <Favorites item={item.id} itemType={item.item_type} details={item.details} />
                                    <Title item={{ title: item.title, release_date: item.data }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

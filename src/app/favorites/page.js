'use client';

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import LoadingSpinner from "@/app/movie/components/LoadingSpinner";
import ImageCard from "@/app/movie/components/ImageCard";
import VoteAverage from "@/app/movie/components/VoteAverage";
import Title from "@/app/movie/components/Title";
import Favorites from "@/app/movie/components/Favorites";

import { useUser } from "@/app/profile/components/useUser";
import { getUserFavorites } from "@/app/favorites/components/getUserFavorites";

export default function FavoritePage() {
    const [loading, setLoading] = useState(true);
    const [favorites, setFavorites] = useState([]);

    const { user } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (user) {
            setLoading(true);
            getUserFavorites(user.id)
                .then(setFavorites)
                .finally(() => setLoading(false));
        }
    }, [user]);

    if (loading) return <LoadingSpinner />;


    return (
        <div>
            <div className="row row-cols-1 row-cols-md-4 g-4">
                {favorites.map((item) => (
                    <div key={item.item_id} className="col" onClick={() =>
                        router.push(`/${item.item_type}/${item.item_id}`)}>

                        <div className="card">
                            <ImageCard item={{ poster_path: item.image, title: item.title, name: item.tv_name }}
                                       customClass="img-card" />
                            <VoteAverage item={{ vote_average: item.vote_average }} />
                            <Favorites item={{ ...item, id: item.item_id }} itemType={item.item_type} details={item}
                                       userId={user.id} favorites={favorites} setFavorites={setFavorites}/>
                            <Title item={{ title: item.title, name: item.tv_name, release_date: item.data,
                                first_air_date: item.tv_date }} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

'use client';

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import LoadingSpinner from "@/app/movie/components/LoadingSpinner";
import ImageCard from "@/app/movie/components/ImageCard";
import VoteAverage from "@/app/movie/components/VoteAverage";
import Title from "@/app/movie/components/Title";
import Favorites from "@/app/movie/components/Favorites";
import Pagination from "@/app/components/Pagination";

import { useUser } from "@/app/profile/components/useUser";
import { getUserFavorites } from "@/app/favorites/components/getUserFavorites";
import { getPaginatedFavorites } from "@/app/favorites/components/getPaginatedFavorites";

export default function FavoritePage() {
    const [loading, setLoading] = useState(true);
    const [favorites, setFavorites] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const itemsPerPage = 20;

    const { user, loading: userLoading } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (user) {
            setLoading(true);
            getUserFavorites(user.id)
                .then((data) => {
                    setFavorites(data);
                    const totalPages = Math.ceil(data.length / itemsPerPage);
                    setTotalPages(totalPages);

                    if (data.length <= (currentPage - 1) * itemsPerPage) {
                        const newPage = currentPage > 1 ? currentPage - 1 : 1;
                        setCurrentPage(newPage);
                    }
                })
                .finally(() => setLoading(false));
        }
    }, [user, currentPage]);

    useEffect(() => {
        const totalPages = Math.ceil(favorites.length / itemsPerPage);
        setTotalPages(totalPages);

        if ((currentPage - 1) * itemsPerPage >= favorites.length) {
            const newPage = currentPage > 1 ? currentPage - 1 : 1;
            setCurrentPage(newPage);
        }
    }, [favorites, currentPage]);

    useEffect(() => {
        if (!user && !userLoading) {
            router.push("/profile");
        }
    }, [user, userLoading, router]);

    if (loading || userLoading) return <LoadingSpinner />;

    return (
        <div>
            <div className="row row-cols-1 row-cols-md-4 g-4">
                {getPaginatedFavorites(favorites, currentPage, itemsPerPage).map((item) => (
                    <div key={item.item_id} className="col" onClick={() =>
                        router.push(`/${item.item_type}/${item.item_id}`)}>

                        <div className="card">
                            <ImageCard item={{ poster_path: item.image, title: item.title, name: item.tv_name }}
                                       customClass="img-card" />
                            <VoteAverage item={{ vote_average: item.vote_average }} />
                            <Favorites item={{ ...item, id: item.item_id }} itemType={item.item_type} details={item}
                                       userId={user.id} favorites={favorites} setFavorites={setFavorites} setCurrentPage={setCurrentPage}/>
                            <Title item={{ title: item.title, name: item.tv_name, release_date: item.data,
                                first_air_date: item.tv_date }} />
                        </div>
                    </div>
                ))}
            </div>

            <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage}
                        fetch={() => getPaginatedFavorites(favorites, currentPage, itemsPerPage)} />
        </div>
    );
}

'use client';

import { useState, useEffect } from "react";
import {useRouter, useSearchParams} from "next/navigation";

import Pagination from "@/app/components/Pagination/Pagination";
import ImageCard from "@/app/components/ImageCard";
import VoteAverage from "@/app/components/VoteAverage";
import Title from "@/app/components/Title";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import Favorites from "@/app/components/Favorites";

import { useUser } from "@/app/hooks/useUser";
import { useFavorites } from "@/app/hooks/useFavorites";

export default function TVPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const initialPage = Number(searchParams.get("page")) || 1;

    const [currentPage, setCurrentPage] = useState(initialPage);
    const [totalPages, setTotalPages] = useState(0);
    const [cardsList, setCardsList] = useState([]);
    const [loading, setLoading] = useState(true);

    const { user } = useUser();
    const { favorites, setFavorites } = useFavorites(user);

    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    const tvApi = `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}`;

    const getCards = (page = 1) => {
        setLoading(true);
        fetch(`${tvApi}&page=${page}`)
            .then(res => res.json())
            .then(json => {
                console.log(json);
                setCardsList(json.results || []);
                setTotalPages(json.total_pages || 1);
                setLoading(false);
            });
    };

    useEffect(() => {
        getCards(currentPage);
    }, [currentPage]);

    useEffect(() => {
        const newPage = Number(searchParams.get("page")) || 1;
        if (newPage !== currentPage) {
            setCurrentPage(newPage);
        }
    }, [searchParams]);

    if (loading) return <LoadingSpinner />;

    return (
        <div>
            <div className="row row-cols-1 row-cols-md-4 g-4">
                {cardsList.map((tv) => (
                    <div key={tv.id} className="col" onClick={() => router.push(`/tv/${tv.id}`)}>
                        <div className="card">
                            <ImageCard item={tv} customClass="img-card" scrollToTrailer={null} />
                            <VoteAverage item={tv} />

                            {user && (
                                <Favorites item={tv} itemType="tv" details={tv} userId={user.id}
                                           favorites={favorites} setFavorites={setFavorites}/>
                            )}

                            <Title item={tv} />
                        </div>
                    </div>
                ))}
            </div>

            <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage}
                        fetch={(page) => {setCurrentPage(page); router.push(`?page=${page}`,
                            { scroll: true });
                        }}/>
        </div>
    );
}

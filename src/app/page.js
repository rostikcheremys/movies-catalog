'use client';

import {useRouter} from "next/navigation";
import {useState, useEffect, useRef} from "react";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

import Pagination from "@/app/components/Pagination";
import ImageCard from "@/app/movie/components/ImageCard";
import VoteAverage from "@/app/movie/components/VoteAverage";
import Title from "@/app/movie/components/Title";
import LoadingSpinner from "@/app/movie/components/LoadingSpinner";
import Favorites from "@/app/movie/components/Favorites";

import { useUser } from "@/app/profile/components/useUser";
import { getUserFavorites } from "@/app/favorites/components/getUserFavorites";

export default function Page() {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [cardsList, setCardsList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [favorites, setFavorites] = useState([]);

    const { user } = useUser();
    const router = useRouter();
    const previousMovieApi = useRef();

    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    const movieApi = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`;

    const getCards = (page = 1) => {
        setLoading(true);
        fetch(`${movieApi}&page=${page}`)
            .then(res => res.json())
            .then(json => {
                console.log(json);
                setCardsList(json.results || []);
                setTotalPages(json.total_pages || 1);
                setLoading(false);
            });
    };

    const handleCardClick = (id) => {
        router.push(`/movie/${id}`);
    };

    useEffect(() => {
        if (previousMovieApi.current !== movieApi) {
            previousMovieApi.current = movieApi;
            getCards(currentPage);
        }
    }, [movieApi]);

    useEffect(() => {
        if (user) {
            getUserFavorites(user.id).then(setFavorites);
        }
    }, [user]);

    if (loading) return <LoadingSpinner />;

    return (
        <div>
            <div className="row row-cols-1 row-cols-md-4 g-4">
                {cardsList.map((movie) => (
                    <div key={movie.id} className="col" onClick={() => handleCardClick(movie.id)}>
                        <div className="card">
                            <ImageCard item={movie} customClass="img-card" scrollToTrailer={null} />
                            <VoteAverage item={movie} />

                            {user && (
                                <Favorites item={movie} itemType="movie" details={movie} userId={user.id}
                                           favorites={favorites} setFavorites={setFavorites}/>
                            )}

                            <Title item={movie} />
                        </div>
                    </div>
                ))}
            </div>

            <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage}
                        fetch={getCards}/>
        </div>
    );
}

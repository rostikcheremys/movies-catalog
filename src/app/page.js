'use client';

import {useRouter} from "next/navigation";
import {useState, useEffect, useRef} from "react";
import Pagination from "@/app/components/Pagination";
import ImageCard from "@/app/movie/components/ImageCard";
import VoteAverage from "@/app/movie/components/VoteAverage";
import Title from "@/app/movie/components/Title";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import LoadingSpinner from "@/app/movie/components/LoadingSpinner";

export default function Page() {

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [cardsList, setCardsList] = useState([]);
    const [loading, setLoading] = useState(true);
    const previousMovieApi = useRef();
    const router = useRouter();

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

    useEffect(() => {
        if (previousMovieApi.current !== movieApi) {
            previousMovieApi.current = movieApi;
            getCards(currentPage);
        }
    }, [movieApi]);

    const handleCardClick = (id) => {
        router.push(`/movie/${id}`);
    };

    if (loading) return <LoadingSpinner />;

    return (
        <div>
            <div className="row row-cols-1 row-cols-md-4 g-4">
                {cardsList.map((item) => (
                    <div key={item.id} className="col" onClick={() => handleCardClick(item.id)}>
                        <div className="card">
                            <ImageCard item={item} customClass="img-card" scrollToTrailer={null}/>
                            <VoteAverage item={item}/>
                            <Title item={item}/>
                        </div>
                    </div>
                ))}
            </div>

            <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} fetch={getCards}/>
        </div>
    );
}

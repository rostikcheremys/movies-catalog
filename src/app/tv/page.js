'use client';

import {useRouter} from "next/navigation";
import {useState, useEffect, useRef} from "react";
import Pagination from "@/app/components/Pagination";
import ImageCard from "@/app/movie/components/ImageCard";
import VoteAverage from "@/app/movie/components/VoteAverage";
import Adult from "@/app/movie/components/Adult";
import Title from "@/app/movie/components/Title";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

export default function Page() {

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [cardsList, setCardsList] = useState([]);

    const apiKey = process.env.NEXT_PUBLIC_API_KEY;

    const tvApi = `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}`;

    const getCards = (page = 1) => {
        fetch(`${tvApi}&page=${page}`)
            .then(res => res.json())
            .then(json => {
                console.log(json);
                setCardsList(json.results || []);
                setTotalPages(json.total_pages || 1);
            });
    };

    const previousTVApi = useRef();

    useEffect(() => {
        if (previousTVApi.current !== tvApi ) {
            previousTVApi.current = tvApi;
            getCards(currentPage);
        }
    }, [tvApi]);

    const router = useRouter();

    const handleCardClick = (id) => {
        router.push(`/tv/${id}`);
    };

    return (
        <div>
            <div className="row row-cols-1 row-cols-md-4 g-4 mx-3 custom-margin-top">
                {cardsList.map((item) => (
                    <div key={item.id} className="col" onClick={() => handleCardClick(item.id)} style={{cursor: 'pointer'}}>
                        <div className="card">
                            <ImageCard item={item} customClass="img-card" scrollToTrailer={null}/>
                            <VoteAverage item={item}/>
                            <Adult item={item}/>
                            <Title item={item}/>
                        </div>
                    </div>
                ))}
            </div>

            <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} fetch={getCards}/>
        </div>
    );
}

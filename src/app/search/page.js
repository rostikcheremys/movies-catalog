'use client'

import {useRouter, useSearchParams} from "next/navigation";
import {useEffect, useRef, useState} from "react";
import Pagination from "@/app/components/Pagination";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import ImageCard from "@/app/movie/components/ImageCard";
import VoteAverage from "@/app/movie/components/VoteAverage";
import Title from "@/app/movie/components/Title";

export default function Page() {
    const searchParams = useSearchParams();
    const query = searchParams.get("query") || "";

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [cardsList, setCardsList] = useState([]);

    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    const searchApi = `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&include_adult=false&language=en-US&query=${query}`;

    const getCards = (page = 1) => {
        fetch(`${searchApi}&page=${page}`)
            .then(res => res.json())
            .then(json => {
                console.log(json);
                setCardsList(json.results || []);
                setTotalPages(json.total_pages || 1);
            });
    };

    const previousSearchApi = useRef();

    useEffect(() => {
        if (previousSearchApi.current !== searchApi) {
            previousSearchApi.current = searchApi;
            setCurrentPage(1);
            getCards(1);
        }
    }, [searchApi]);

    const router = useRouter();

    const handleCardClick = (id, mediaType) => {
        router.push(`/${mediaType}/${id}`);
    };

    return (
        <div>
            <div className="row row-cols-1 row-cols-md-4 mx-3 g-4 custom-margin-top">
                {cardsList.map((item) => (
                    <div key={item.id} className="col" onClick={() => handleCardClick(item.id, item.media_type)}>
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

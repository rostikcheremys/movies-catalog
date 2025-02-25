'use client';

import {useState, useEffect, useRef} from "react";
import Pagination from "@/app/components/Pagination";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import Card from "@/app/components/Card";

export default function Page() {

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [cardsList, setCardsList] = useState([]);
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    const tvShowsApi = `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}`;

    const getCards = (page = 1) => {

        fetch(`${tvShowsApi}&page=${page}`)
            .then(res => res.json())
            .then(json => {
                console.log(json);
                setCardsList(json.results || []);
                setTotalPages(json.total_pages || 1);
            });
    };

    const prevApiRef = useRef();

    useEffect(() => {
        if (currentPage !== 1 || prevApiRef.current !== tvShowsApi ) {
            prevApiRef.current = tvShowsApi;
            getCards(currentPage);
        }
    }, [tvShowsApi]);

    return (
        <div>
            <div className="row row-cols-1 row-cols-md-4 g-4 custom-mt-card mx-3 custom-margin-top">
                {cardsList.map((item) => (
                    <Card key={item.id} {...item} />
                ))}
            </div>

            <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} fetch={getCards}/>
        </div>
    );
}

'use client'

import {useSearchParams} from "next/navigation";
import {useEffect, useRef, useState} from "react";
import Pagination from "@/app/components/Pagination";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

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

    const prevApiRef = useRef();

    useEffect(() => {
        if (prevApiRef.current !== searchApi) {
            prevApiRef.current = searchApi;
            setCurrentPage(1);
            getCards(1);
        }
    }, [searchApi]);

    return (
        <div>
            <div className="row row-cols-1 row-cols-md-4 mx-3 custom-margin-top">
                {cardsList.map((item) => (
                    console.log("")
                    /*<Card key={item.id} {...item} />*/
                ))}
            </div>

            <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} fetch={getCards}/>
        </div>
    );
}

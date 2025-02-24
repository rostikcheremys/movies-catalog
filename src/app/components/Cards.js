'use client'

import {useEffect, useRef, useState} from "react";
import Pagination from "@/app/components/Pagination";
import Card from "@/app/components/Card";
import {useSearchParams} from "next/navigation";

export default function Cards({ api }) {
    const [cardsList, setCardsList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const getCards = (page = 1) => {
        fetch(`${api}&page=${page}`)
            .then(res => res.json())
            .then(json => {
                console.log(json);
                setCardsList(json.results || []);
                setTotalPages(json.total_pages || 1);
            });
    };

    const prevPageRef = useRef();
    const prevApiRef = useRef();


    useEffect(() => {
        if (prevApiRef.current !== api) {
            console.log("api")

            prevApiRef.current = api;

            console.log("currentPage = 1")
            setCurrentPage(1);
            getCards(1);
        }

        if (prevPageRef.current !== currentPage) {

            if (currentPage !== 1) {
                prevPageRef.current = currentPage;

                console.log("currentPage")
                getCards(currentPage);
            }
        }
    }, [api, currentPage]);




    return (
        <div>
            <div className="row row-cols-1 row-cols-md-4 g-4 custom-mt-card mx-3 custom-margin-top">
                {cardsList.map((item) => (
                    <Card key={item.id} {...item} />
                ))}
            </div>

            <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
        </div>
    );
}

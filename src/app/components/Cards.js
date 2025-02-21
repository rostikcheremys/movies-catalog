"use client";

import React, { useEffect, useState } from "react";
import Pagination from "@/app/components/Pagination";
import Card from "@/app/components/Card";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
export default function Cards({ api }) {  // Отримуємо api з пропсів
    const [cardsList, setCardsList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const getCards = (page = 1) => {
        fetch(`${api}&page=${page}`) // Додаємо змінну `page` у запит
            .then(res => res.json())
            .then(json => {
                console.log(json.results);
                setCardsList(json.results || []);
                setTotalPages(json.total_pages || 1);
            })
            .catch(error => console.error("Error fetching data:", error));
    };

    useEffect(() => {
        getCards(currentPage);
    }, [currentPage]);

    return (
        <div>
            <div className="row row-cols-1 row-cols-md-4 g-4 custom-mt-card mx-3 custom-margin-top">
                {cardsList.map((item) => (Card(item)))}
            </div>

            <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
        </div>
    );
}

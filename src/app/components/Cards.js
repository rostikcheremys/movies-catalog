"use client";

import React, { useEffect, useState } from "react";
import Pagination from "@/app/components/Pagination";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

export default function Cards({ isTvShows }) {
    const [cardsList, setCardsList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const getCards = (page = 1) => {
        const apiKey = process.env.NEXT_PUBLIC_MOVIE_API_KEY;
        const endpoint = isTvShows
            ? `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&page=${page}`
            : `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=${page}`;

        fetch(endpoint)
            .then(res => res.json())
            .then(json => {
                setCardsList(json.results);
                setTotalPages(json.total_pages);
            });
    };

    useEffect(() => {
        setCurrentPage(1);
    }, [isTvShows]);

    useEffect(() => {
        getCards(currentPage);
    }, [currentPage, isTvShows]);

    return (
        <div>
            <div className="row row-cols-1 row-cols-md-4 g-4 custom-mt-card mx-3 custom-margin-top">
                {cardsList.map((item) => (Card(item)))}
            </div>

            <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
        </div>
    );
}

function Card(item) {
    const voteAverage = item.vote_average;
    const title = item.title || 'No title available';

    return (
        <div key={item.id} className="col">
            <div className="card custom-card-body-color custom-rounded">

                <div className={`custom-vote-average text-white start-0 top-0 p-1 fw-bold position-absolute 
                    ${voteAverage >= 8 ? "bg-success" : voteAverage >= 7 ? "bg-warning" : "bg-orange"}`}>
                    {voteAverage.toFixed(2)}
                </div>

                {item.adult && (
                    <div className="custom-adult text-white end-0 top-0 p-1 fw-bold position-absolute">+18</div>
                )}
                <img
                    src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                    className="custom-rounded-img"
                    alt={title}

                />
                <div className="card-body custom-card-body-color custom-rounded">
                    <h6 className="card-title text-center text-truncate text-white d-block custom-max-width">
                        {title}
                    </h6>
                </div>
            </div>
        </div>
    );
}

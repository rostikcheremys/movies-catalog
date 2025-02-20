"use client";

import React, { useEffect, useState } from "react";
import Pagination from "@/app/components/Pagination";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

export default function Card({ isTvShows }) {
    const [movieList, setMovieList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const getCard = (page = 1) => {
        const apiKey = process.env.NEXT_PUBLIC_MOVIE_API_KEY;
        const endpoint = isTvShows
            ? `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&page=${page}`
            : `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=${page}`;

        fetch(endpoint)
            .then(res => res.json())
            .then(json => {
                setMovieList(json.results);
                setTotalPages(json.total_pages);
            });
    };

    useEffect(() => {
        setCurrentPage(1);
    }, [isTvShows]);

    useEffect(() => {
        getCard(currentPage);
    }, [currentPage, isTvShows]);

    return (
        <div>
            <div className="row row-cols-1 row-cols-md-4 g-4 custom-mt-card mx-3 custom-margin-top">
                {movieList.map((item) => (
                    <div key={item.id} className="col">
                        <div className="card custom-card-body-color custom-rounded">
                            <img
                                src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                                className="card-img-top custom-rounded-img"
                                alt={item.title || item.name}
                            />
                            <div className="card-body custom-card-body-color custom-rounded">
                                <h5 className="card-title text-white text-truncate d-block custom-max-width">
                                    {item.title || item.name || 'No title available'}
                                </h5>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
        </div>
    );
}

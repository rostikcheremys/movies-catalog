"use client";

import React, { useEffect, useState } from "react";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

import Pagination from "@/app/components/Pagination";

export default function Card() {
    const [movieList, setMovieList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const getCard = (page = 1) => {
        const apiKey = process.env.NEXT_PUBLIC_MOVIE_API_KEY;

        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=${page}`)
            .then(res => res.json())
            .then(json => {
                setMovieList(json.results);
                setTotalPages(json.total_pages);
            });
    };

    useEffect(() => {
        getCard(currentPage);
    }, [currentPage]);

    return (
        <div>
            <div className="row row-cols-1 row-cols-md-4 g-4 custom-mt-card mx-3 custom-margin-top">
                {movieList.map((movie) => (
                    <div key={movie.id} className="col">
                        <div className="card custom-card-body-color custom-rounded">
                            <img
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                className="card-img-top custom-rounded-img"
                                alt={movie.title}
                            />
                            <div className="card-body custom-card-body-color custom-rounded">
                                <h5 className="card-title text-white text-truncate d-block custom-max-width">
                                    {movie.title || 'No title available'}
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

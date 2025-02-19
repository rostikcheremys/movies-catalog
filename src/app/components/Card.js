"use client";

import React, { useEffect, useState } from "react";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import './styles.css';

export default function Card() {
    const [movieList, setMovieList] = useState([]);

    const getCard = () => {
        const apiKey = process.env.NEXT_PUBLIC_MOVIE_API_KEY;

        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`)
            .then(res => res.json())
            .then(json => setMovieList(json.results));
    };

    useEffect(() => {
        getCard();
    }, []);

    return (
        <div className="row row-cols-1 row-cols-md-4 g-4 custom-margin">
            {movieList.map((movie) => (
                <div key={movie.id} className="col">
                    <div className="card custom-card-body-color custom-rounded">
                        <img
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            className="card-img-top custom-rounded-img"
                            alt={movie.title}
                        />
                        <div className="card-body custom-card-body-color custom-rounded">
                            <h5 className="card-title text-white">
                                {movie.title ? (movie.title.length > 25 ? movie.title.slice(0, 25) + '...' : movie.title) : 'No title available'}
                            </h5>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

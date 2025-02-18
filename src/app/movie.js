"use client";

import React, { useEffect, useState } from "react";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

export default function Movie() {
    const [movieList, setMovieList] = useState([]);

    const getMovie = () => {
        const apiKey = process.env.NEXT_PUBLIC_MOVIE_API_KEY;

        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`)
            .then(res => res.json())
            .then(json => setMovieList(json.results));
    };

    useEffect(()  => {
        getMovie();
    }, []);

    return (
        <div>
            {movieList.map((movie) => (
                <img
                    key={movie.id}
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                />
            ))}
        </div>
    );
}


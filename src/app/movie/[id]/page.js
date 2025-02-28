'use client';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

export default function Page() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [trailer, setTrailer] = useState(null);

    const apiKey = process.env.NEXT_PUBLIC_API_KEY;

    useEffect(() => {
        if (!id) return;

        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`)
            .then((res) => res.json())
            .then((data) => setMovie(data));

        fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}`)
            .then((res) => res.json())
            .then((data) => {
                const officialTrailer = data.results.find(video => video.type === "Trailer" && video.site === "YouTube");

                if (officialTrailer) setTrailer(officialTrailer.key);
            });
    }, [id]);

    if (!movie) return <p>Loading...</p>;

    return (
        <div className="container">
            <div className="card-body-item">
                <div className="movie-card">
                    <div className="image-container">
                        <img
                            className="img-item"
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title || "No title available"}
                        />


                    </div>

                    <div className={`vote-average-item text-white t-1 p-1 fw-bold position-absolute 
                            ${movie.vote_average >= 8 ? "bg-success" : movie.vote_average >= 7 ? "bg-warning" : "bg-orange"}`}>
                        {(movie.vote_average ? movie.vote_average.toFixed(2) : "0.00")}
                    </div>

                    {movie.adult && (
                        <div className="custom-adult text-white end-0 top-0 p-1 fw-bold position-absolute">+18</div>
                    )}

                    <div className="content-container">
                        <div className="title-item">
                            <a href={movie.homepage}>{movie.title}</a>
                        </div>

                        <div className="card-info-item">
                            <p>{movie.genres.map((genre) => genre.name).join(", ")}</p>
                            <p>{movie.release_date}</p>
                            <p><strong>Runtime:</strong> {movie.runtime} minutes</p>
                            <p><strong>Language:</strong> {movie.spoken_languages.map((lang) => lang.english_name).join(", ")}</p>
                            <p><strong>Popularity:</strong> {movie.popularity}</p>
                            <p><strong>Countries:</strong> {movie.production_countries.map((country) => country.name).join(", ")}</p>
                            <p><strong>Companies:</strong> {movie.production_companies.map((company) => company.name).join(", ")}</p>
                            <p className="overview-item">{movie.overview}</p>
                        </div>
                    </div>
                </div>
            </div>

            {trailer ? (
                <div className="trailer-container">
                    <iframe
                        className="iframe-trailer"
                        src={`https://www.youtube.com/embed/${trailer}`}
                        allowFullScreen
                    ></iframe>
                </div>
            ) : (<p>No trailer available...</p>)}
        </div>
    );
}

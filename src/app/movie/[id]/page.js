'use client';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

export default function Page() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);

    const apiKey = process.env.NEXT_PUBLIC_API_KEY;

    useEffect(() => {
        if (!id) return;
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`)
            .then((res) => res.json())
            .then((data) => setMovie(data));
    }, [id]);

    if (!movie) return <p>Loading...</p>;

    return (
        <div className="container text-white custom-margin-top">
            <div className="row row-cols-1 row-cols-md-2 g-4 custom-margin-top">
                <div className="card custom-rounded custom-card-body-color p-0">
                    <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        className="w-100 h-100 border-to objet-fit-cover custom-img"
                        alt={movie.title || "No title available"}
                    />

                    <div className="card-body text-white">
                        <p><strong>Genres:</strong> {movie.genres.map((genre) => genre.name).join(", ")}</p>
                        <p><strong>Release Date:</strong> {movie.release_date}</p>
                        <p><strong>Runtime:</strong> {movie.runtime} minutes</p>
                        <p>
                            <strong>Language:</strong> {movie.spoken_languages.map((lang) => lang.english_name).join(", ")}
                        </p>
                        <p><strong>Popularity:</strong> {movie.popularity}</p>
                        <p><strong>Average Rating:</strong> {movie.vote_average} ({movie.vote_count} votes)</p>
                        <p><strong>Tagline:</strong> {movie.tagline}</p>
                        <p><strong>Production
                            Countries:</strong> {movie.production_countries.map((country) => country.name).join(", ")}
                        </p>
                        <p><strong>Production
                            Companies:</strong> {movie.production_companies.map((company) => company.name).join(", ")}
                        </p>

                    </div>
                </div>

                <div className="card-trailer">
                    <div className="">
                        <iframe
                            className="w-full h-0 rounded-lg"
                            src={`https://www.youtube.com/embed/${movie.trailer_id}`}
                            allowFullScreen
                        ></iframe>
                    </div>

                    <p><strong>Description:</strong> {movie.overview}</p>
                    <a href={movie.homepage} target="_blank" rel="noopener noreferrer">Official Website</a>
                </div>
            </div>
        </div>
    );
}

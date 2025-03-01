'use client';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function Page() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [trailer, setTrailer] = useState(null);
    const [cast, setCast] = useState([]);
    const [crew, setCrew] = useState([]);
    const [reviews, setReviews] = useState([]);

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

        fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}`)
            .then((res) => res.json())
            .then((data) => {
                setCast(data.cast);
                setCrew(data.crew);
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

                    <div className={`vote-average-item
                            ${movie.vote_average >= 8 ? "bg-success" : movie.vote_average >= 7 ? "bg-warning" : "bg-orange"}`}>
                        {(movie.vote_average ? movie.vote_average.toFixed(2) : "0.00")}
                    </div>

                    <div className="content-container">
                        <div className="title-item">
                            <a href={movie.homepage}>{movie.title}</a>
                        </div>

                        <div className="line-item"></div>

                        <div className="card-info-item">
                            <p><i className="bi bi-star-fill"></i> {movie.popularity}</p>
                            <p><i className="bi bi-tags-fill"></i> {movie.genres.map((genre) => genre.name).join(", ")}
                            </p>
                            <p><i className="bi bi-clock-fill"></i> {movie.runtime} minutes</p>
                            <p><i
                                className="bi bi-globe2"></i> {movie.spoken_languages.map((lang) => lang.english_name).join(", ")}
                            </p>
                            <p><i
                                className="bi bi-geo-alt-fill"></i> {movie.production_countries.map((country) => country.name).join(", ")}
                            </p>
                            <p><i
                                className="bi bi-building-fill"></i> {movie.production_companies.map((company) => company.name).join(", ")}
                            </p>
                            <p><i className="bi bi-calendar2-week-fill"></i> {movie.release_date}</p>
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

            <div className="cast-container">
                <h2>Top Billed Cast</h2>
                <div className="overflow-auto">
                    <ul className="cast-list">
                        {cast.map((member) => (
                            <li key={member.cast_id} className="cast-item">
                                {member.profile_path ? (
                                    <img
                                        className="cast-photo"
                                        src={`https://image.tmdb.org/t/p/w185${member.profile_path}`}
                                        alt={member.name}
                                    />
                                ) : (
                                    <div className="cast-photo-placeholder">
                                        <span><i className="bi bi-person-circle"></i></span>
                                    </div>
                                )}
                                <p><strong>{member.name}</strong> <br/>{member.character}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

        </div>
    );
}

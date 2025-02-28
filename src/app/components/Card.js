'use client'

import { useState } from "react";

export default function Card(props) {
    const { vote_average, title, name, poster_path, id, adult, release_date, first_air_date } = props;
    const [isHovered, setIsHovered] = useState(false);
    const [isPlayButtonHovered, setIsPlayButtonHovered] = useState(false);

    const voteAverage = vote_average;
    const itemTitle = title || name || "No title available";

    return (
        <div className="card custom-card-body-color custom-rounded d-flex flex-column justify-content-between h-100">
            <div className="position-relative" onMouseEnter={() => setIsHovered(true)}
                 onMouseLeave={() => setIsHovered(false)}>
                {isHovered && (
                    <div
                        className="position-absolute top-50 start-50 translate-middle d-flex align-items-center justify-content-center"
                        onMouseEnter={() => setIsPlayButtonHovered(true)}
                        onMouseLeave={() => setIsPlayButtonHovered(false)}
                    >
                        <div className="play-button">
                            <div className="play-icon"></div>
                        </div>
                    </div>
                )}
                <img
                    src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                    className={`w-100 h-auto object-fit-cover border-to custom-card-img ${isHovered && !isPlayButtonHovered ? "hovered" : ""}`}
                    alt={itemTitle}
                />
            </div>

            <div
                className={`custom-vote-average text-white start-0 top-0 p-1 fw-bold position-absolute 
                    ${voteAverage >= 8 ? "bg-success" : voteAverage >= 7 ? "bg-warning" : "bg-orange"}`}>
                {(voteAverage ? voteAverage.toFixed(2) : "0.00")}
            </div>
            {adult && (
                <div className="custom-adult text-white end-0 top-0 p-1 fw-bold position-absolute">+18</div>
            )}
            <div
                className="card-body custom-card-body-color custom-card-body-rounded pb-1 flex-grow-1 d-flex flex-column justify-content-start h-100">
                <h5 className="card-title text-center text-truncate text-white d-block custom-max-width">
                    {itemTitle}
                </h5>
                <h6 className="text-center text-truncate text-white d-block custom-max-width custom-opacity">
                    {release_date ? release_date.slice(0, 4) : first_air_date ? first_air_date.slice(0, 4) : "N/A"}
                </h6>
            </div>
        </div>
    );
}

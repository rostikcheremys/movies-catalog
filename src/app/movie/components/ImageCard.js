'use client';

import { useState } from "react";
import Image from "next/image";

export default function ImageCard({ movie, scrollToTrailer }) {
    const [isHovered, setIsHovered] = useState(false);
    const [isPlayButtonHovered, setIsPlayButtonHovered] = useState(false);

    return (
        <div className="image-container">
            <div className="image-wrapper position-relative" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                {isHovered && (
                    <div className="play-button-container"
                         onMouseEnter={() => setIsPlayButtonHovered(true)}
                         onMouseLeave={() => setIsPlayButtonHovered(false)}>
                        <div className="play-button">
                            <div className="play-icon"></div>
                        </div>
                    </div>
                )}

                {movie.poster_path ? (
                    <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        className={`img-item ${isHovered && !isPlayButtonHovered ? "hovered" : ""}`}
                        alt={movie.title || movie.name || "No title available"}
                        onClick={scrollToTrailer}
                    />
                ) : (
                    <div className="image-placeholder">
                        <Image
                            src="/image-placeholder.png"
                            className={`img-item ${isHovered && !isPlayButtonHovered ? "hovered" : ""}`}
                            alt={movie.title || movie.name || "No title available"}
                            width={500}
                            height={750}
                        />
                        <i className="bi bi-film"></i>
                    </div>
                )}
            </div>
        </div>
    );
}

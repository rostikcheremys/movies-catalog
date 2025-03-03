'use client';

import { useState } from "react";

export default function Image({ movie, scrollToTrailer }) {
    const [isHovered, setIsHovered] = useState(false);
    const [isPlayButtonHovered, setIsPlayButtonHovered] = useState(false);

    return (
        <div className="image-container">
            <div className="position-relative"
                 onMouseEnter={() => setIsHovered(true)}
                 onMouseLeave={() => setIsHovered(false)}>
                {isHovered && (
                    <div className="play-button-container"
                         onMouseEnter={() => setIsPlayButtonHovered(true)}
                         onMouseLeave={() => setIsPlayButtonHovered(false)}>
                        <div className="play-button">
                            <div className="play-icon"></div>
                        </div>
                    </div>
                )}
                <img className={`img-item ${isHovered && !isPlayButtonHovered ? "hovered" : ""}`}
                     src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                     alt={movie.title || "No title available"}
                     onClick={scrollToTrailer}
                />
            </div>
        </div>
    );
}

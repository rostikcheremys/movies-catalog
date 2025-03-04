'use client';

import { useState } from "react";
import Image from "next/image";

export default function ImageCard({ item, customClass, scrollToTrailer }) {
    const [isHovered, setIsHovered] = useState(false);
    const [isPlayButtonHovered, setIsPlayButtonHovered] = useState(false);

    return (
        <div className="image-container">
            <div className="image-wrapper"
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

                {item.poster_path ? (
                    <img
                        src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                        className={`${customClass} ${isHovered && !isPlayButtonHovered ? "hovered" : ""}`}
                        alt={item.title || item.name || "No title available"}
                        onClick={scrollToTrailer}
                    />
                ) : (
                    <div className="image-placeholder">
                        <Image
                            src="/image-placeholder.png"
                            className={`${customClass} ${isHovered && !isPlayButtonHovered ? "hovered" : ""}`}
                            alt={item.title || item.name || "No title available"}
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

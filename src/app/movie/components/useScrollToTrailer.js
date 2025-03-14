'use client';

import { useRef } from "react";

export function useScrollToTrailer() {
    const trailerRef = useRef(null);

    const scrollToTrailer = () => {
        trailerRef.current && trailerRef.current.scrollIntoView({ behavior: "smooth" });
    };

    return { trailerRef, scrollToTrailer };
}
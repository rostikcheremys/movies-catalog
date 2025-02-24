'use client'

import React from "react";
import Cards from "@/app/components/Cards";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

export default function Page() {
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    const movieApi = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`;

    return (
        <div>
            <Cards api={movieApi} />
        </div>
    );
}

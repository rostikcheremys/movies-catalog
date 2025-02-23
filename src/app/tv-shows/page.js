'use client'

import React from "react";
import Cards from "@/app/components/Cards";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

export default function Page() {
    const apiKey = process.env.NEXT_PUBLIC_MOVIE_API_KEY;
    const api = `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}`;

    return (
        <div>
            <Cards api={api} />
        </div>
    );
}

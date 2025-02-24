'use client'

import {useSearchParams} from "next/navigation";
import Cards from "@/app/components/Cards";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

export default function Page() {
    const searchParams = useSearchParams();
    const query = searchParams.get("query") || "";
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;

    const searchApi = `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&include_adult=false&language=en-US&query=${query}`;

    return (
        <div>
            <Cards api={searchApi} />
        </div>
    );
}

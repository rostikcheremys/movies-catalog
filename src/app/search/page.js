'use client'

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState, Suspense } from "react";
import Pagination from "@/app/components/Pagination";
import ImageCard from "@/app/movie/components/ImageCard";
import VoteAverage from "@/app/movie/components/VoteAverage";
import Title from "@/app/movie/components/Title";
import LoadingSpinner from "@/app/movie/components/LoadingSpinner";
import Favorites from "@/app/movie/components/Favorites";

export default function Page() {
    return (
        <Suspense fallback={<LoadingSpinner />}>
            <SearchPage />
        </Suspense>
    );
}

function SearchPage() {
    const searchParams = useSearchParams();
    const query = searchParams.get("query") || "";

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [cardsList, setCardsList] = useState([]);
    const [loading, setLoading] = useState(true);
    const previousSearchApi = useRef();
    const router = useRouter();

    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    const searchApi = `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&include_adult=false&language=en-US&query=${query}`;

    const getCards = (page = 1) => {
        setLoading(true);
        fetch(`${searchApi}&page=${page}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Network response was not ok");
                }
                return res.json();
            })
            .then((json) => {
                console.log(json);
                setCardsList(json.results || []);
                setTotalPages(json.total_pages || 1);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Fetch error: ", error);
                setLoading(false);
            });
    };

    useEffect(() => {
        if (query.trim() !== "") {
            if (previousSearchApi.current !== searchApi) {
                previousSearchApi.current = searchApi;
                setCurrentPage(1);
                getCards(1);
            }
        }
    }, [searchApi, query]);

    const handleCardClick = (id, mediaType) => {
        const validMediaTypes = ["movie", "tv"];
        if (validMediaTypes.includes(mediaType)) {
            router.push(`/${mediaType}/${id}`);
        } else {
            router.push("/not-found");
        }
    };

    if (loading) return <LoadingSpinner />;

    return (
        <div>
            <div className="row row-cols-1 row-cols-md-4 g-4">
                {cardsList.map((search) => (
                    <div key={search.id} className="col" onClick={() => handleCardClick(search.id, search.media_type)}>
                        <div className="card">
                            <ImageCard item={search} customClass="img-card" scrollToTrailer={null} />
                            <VoteAverage item={search} />
                            <Favorites item={search} />
                            <Title item={search} />
                        </div>
                    </div>
                ))}
            </div>

            <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} fetch={getCards} />
        </div>
    );
}

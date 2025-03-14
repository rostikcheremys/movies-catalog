'use client'

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

import Pagination from "@/app/components/Pagination";
import ImageCard from "@/app/movie/components/ImageCard";
import VoteAverage from "@/app/movie/components/VoteAverage";
import Title from "@/app/movie/components/Title";
import LoadingSpinner from "@/app/movie/components/LoadingSpinner";
import Favorites from "@/app/movie/components/Favorites";

import { useUser } from "@/app/profile/components/useUser";
import { useFavorites } from "@/app/favorites/components/useFavorites";

export default function Page() {
    return (
        <Suspense fallback={<LoadingSpinner />}>
            <SearchPage />
        </Suspense>
    );
}

function SearchPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const query = searchParams.get("query") || "";
    const initialPage = Number(searchParams.get("page")) || 1;

    const [currentPage, setCurrentPage] = useState(initialPage);
    const [totalPages, setTotalPages] = useState(0);
    const [cardsList, setCardsList] = useState([]);
    const [loading, setLoading] = useState(true);

    const { user } = useUser();
    const { favorites, setFavorites } = useFavorites(user);

    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    const searchApi = `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&include_adult=false&language=en-US&query=${query}`;

    const handleCardClick = (id, mediaType) => {
        if (mediaType === "movie" || mediaType === "tv") {
            router.push(`/${mediaType}/${id}`);
        } else {
            router.push("/not-found");
        }
    }

    const getCards = (page = 1) => {
        setLoading(true);
        fetch(`${searchApi}&page=${page}`)
            .then((res) => res.json())
            .then((json) => {
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
            getCards(initialPage);
            setCurrentPage(initialPage);
        }
    }, [query, initialPage]);

    if (loading) return <LoadingSpinner />;

    return (
        <div>
            <div className="row row-cols-1 row-cols-md-4 g-4">
                {cardsList.map((search) => (
                    <div key={search.id} className="col" onClick={() => {
                        handleCardClick(search.id, search.media_type)}
                    }>
                        <div className="card">
                            <ImageCard item={search} customClass="img-card" scrollToTrailer={null} />
                            <VoteAverage item={search} />

                            {user && (
                                <Favorites item={search} itemType={search.media_type} details={search} userId={user.id}
                                           favorites={favorites} setFavorites={setFavorites}/>
                            )}

                            <Title item={search} />
                        </div>
                    </div>
                ))}
            </div>

            <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage}
                        fetch={(page) => {setCurrentPage(page); router.push(`?query=${query}&page=${page}`,
                            { scroll: true });
                        }}/>
        </div>
    );
}

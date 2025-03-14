'use client';

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import ImageCard from "@/app/components/ImageCard";
import InfoList from "@/app/components/InfoList";
import CastList from "@/app/components/CastList";
import Overview from "@/app/components/Overview";
import Trailer from "@/app/components/Trailer";
import VoteAverage from "@/app/components/VoteAverage";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import Favorites from "@/app/components/Favorites";

import { useUser } from "@/app/hooks/useUser";
import { useFavorites } from "@/app/hooks/useFavorites";
import {useScrollToTrailer} from "@/app/hooks/useScrollToTrailer";

export default function Page() {
    const [tv, setTV] = useState(null);
    const [trailer, setTrailer] = useState(null);
    const [cast, setCast] = useState([]);
    const [loading, setLoading] = useState(true);

    const { id } = useParams();
    const { user } = useUser();
    const { favorites, setFavorites } = useFavorites(user);
    const { trailerRef, scrollToTrailer } = useScrollToTrailer();

    const apiKey = process.env.NEXT_PUBLIC_API_KEY;

    useEffect(() => {
        if (!id) return;

        Promise.all([
            fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}`).then(res => res.json()),
            fetch(`https://api.themoviedb.org/3/tv/${id}/videos?api_key=${apiKey}`).then(res => res.json()),
            fetch(`https://api.themoviedb.org/3/tv/${id}/credits?api_key=${apiKey}`).then(res => res.json())
        ]).then(([movieData, videoData, castData]) => {
            setTV(movieData);
            const officialTrailer = videoData.results.find(video => video.type === "Trailer" && video.site === "YouTube");
            if (officialTrailer) setTrailer(officialTrailer.key);
            setCast(castData.cast);
            setLoading(false);
        });
    }, [id]);

    if (loading) return <LoadingSpinner />;

    return (
        <div className="container">
            <div className="card-body-item">
                <div className="card-container">
                    <div className="image-container">
                        <ImageCard item={tv} customClass="img-item" scrollToTrailer={scrollToTrailer}/>

                        {user && (
                            <Favorites item={tv} itemType="tv" details={tv} userId={user.id}
                                       favorites={favorites} setFavorites={setFavorites}/>
                        )}
                    </div>

                    <VoteAverage item={tv}/>
                    <InfoList item={tv}/>
                </div>
            </div>

            <Overview overview={tv.overview} trailerRef={trailerRef} />
            <Trailer trailer={trailer} itemTitle={tv.name} />
            <CastList cast={cast} />
        </div>
    );
}

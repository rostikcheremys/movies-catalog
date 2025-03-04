'use client';

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import ImageCard from "@/app/movie/components/ImageCard";
import InfoList from "@/app/movie/components/InfoList";
import CastList from "@/app/movie/components/CastList";
import LoadingSpinner from "@/app/movie/components/LoadingSpinner";
import Overview from "@/app/movie/components/Overview";
import Trailer from"@/app/movie/components/Trailer";
import VoteAverage from "@/app/movie/components/VoteAverage";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

export default function Page() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [trailer, setTrailer] = useState(null);
    const [cast, setCast] = useState([]);
    const [loading, setLoading] = useState(true);
    const trailerRef = useRef(null);

    const apiKey = process.env.NEXT_PUBLIC_API_KEY;

    useEffect(() => {
        if (!id) return;

        Promise.all([
            fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`).then(res => res.json()),
            fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}`).then(res => res.json()),
            fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}`).then(res => res.json())
        ]).then(([movieData, videoData, castData]) => {
            setMovie(movieData);
            const officialTrailer = videoData.results.find(video => video.type === "Trailer" && video.site === "YouTube");
            if (officialTrailer) setTrailer(officialTrailer.key);
            setCast(castData.cast);
            setLoading(false);
        });
    }, [id]);

    if (loading) return <LoadingSpinner />;

    const scrollToTrailer = () => {
        if (trailerRef.current) {
            trailerRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className="container">
            <div className="card-body-item">
                <div className="card-container">
                    <div className="image-container">
                        <ImageCard item={movie} customClass="img-item" scrollToTrailer={scrollToTrailer}/>
                    </div>

                    <VoteAverage item={movie}/>
                    <InfoList item={movie}/>
                </div>
            </div>

            <Overview overview={movie.overview} trailerRef={trailerRef}/>
            <Trailer trailer={trailer} itemTitle={movie.title}/>
            <CastList cast={cast}/>
        </div>
    );
}

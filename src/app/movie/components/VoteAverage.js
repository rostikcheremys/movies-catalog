'use client';

export default function VoteAverage({movie}) {
    return (
        <div className={`vote-average-item
            ${movie.vote_average >= 8 ? "bg-success" : movie.vote_average >= 7 ? "bg-warning" : "bg-orange"}`}>
            {movie.vote_average ? movie.vote_average.toFixed(2) : "0.00"}
        </div>
    );
}
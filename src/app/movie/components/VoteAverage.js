'use client';

export default function VoteAverage({item}) {
    return (
        <div className={`vote-average-item
            ${item.vote_average >= 8 ? "bg-success" : item.vote_average >= 7 ? "bg-warning" : "bg-orange"}`}>
            {item.vote_average ? item.vote_average.toFixed(2) : "0.00"}
        </div>
    );
}
'use client';

export default function Trailer({ trailer, itemTitle }) {
    return (
        trailer && (
            <div className="trailer-container">
                <h3>{itemTitle} — Official Trailer</h3>
                <div className="line-item"></div>
                <iframe className="iframe-trailer" src={`https://www.youtube.com/embed/${trailer}`} allowFullScreen></iframe>
            </div>
        )
    );
}

'use client';

export default function Trailer({ trailer, movieTitle }) {
    return (
        trailer && (
            <div className="trailer-container">
                <h3>{movieTitle} — Official Trailer</h3>
                <div className="line-item"></div>
                <iframe className="iframe-trailer" src={`https://www.youtube.com/embed/${trailer}`} allowFullScreen></iframe>
            </div>
        )
    );
}

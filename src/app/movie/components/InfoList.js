'use client';

export default function InfoList({ movie }) {
    return (
        <div className="content-container">
            <div className="title-item">
                <a href={movie.homepage}>{movie.title || movie.name}</a>
            </div>

            <div className="line-item-static"></div>

            <div className="card-info-item">
                <p><i className="bi bi-star-fill"></i> {Math.round(movie.popularity)}</p>
                <p><i className="bi bi-tags-fill"></i> {movie.genres.map((genre) => genre.name).join(", ")}</p>
                <p><i className="bi bi-clock-fill"></i> {movie.runtime} minutes</p>
                <p><i className="bi bi-globe2"></i> {movie.spoken_languages.map((lang) => lang.english_name).join(", ")}</p>
                <p><i className="bi bi-geo-alt-fill"></i> {movie.production_countries.map((country) => country.name).join(", ")}</p>
                <p><i className="bi bi-building-fill"></i> {movie.production_companies.map((company) => company.name).join(", ")}</p>
                <p><i className="bi bi-calendar2-week-fill"></i> {movie.release_date || movie.first_air_date}</p>
            </div>
        </div>
    );
}


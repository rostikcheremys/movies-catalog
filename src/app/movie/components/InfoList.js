'use client';

export default function InfoList({ item }) {
    return (
        <div className="content-container">
            <div className="title">
                <a href={item.homepage}>{item.title || item.name}</a>
            </div>

            <div className="line-item-static"></div>

            <div className="card-info-item">
                <p><i className="bi bi-star-fill"></i> {Math.round(item.popularity)}</p>
                <p><i className="bi bi-tags-fill"></i> {item.genres.map((genre) => genre.name).join(", ")}</p>
                <p><i className="bi bi-clock-fill"></i> {item.runtime} minutes</p>
                <p><i className="bi bi-globe2"></i> {item.spoken_languages.map((lang) => lang.english_name).join(", ")}</p>
                <p><i className="bi bi-geo-alt-fill"></i> {item.production_countries.map((country) => country.name).join(", ")}</p>
                <p><i className="bi bi-building-fill"></i> {item.production_companies.map((company) => company.name).join(", ")}</p>
                <p><i className="bi bi-calendar2-week-fill"></i> {item.release_date || item.first_air_date}</p>
            </div>
        </div>
    );
}


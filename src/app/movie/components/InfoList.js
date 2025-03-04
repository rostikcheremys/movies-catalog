'use client';

export default function InfoList({ item }) {
    return (
        <div className="content-container">
            <div className="title">
                <a href={item.homepage}>{item.title || item.name}</a>
            </div>

            <div className="line-item-static"></div>

            <div className="card-info-item">
                {item.popularity && (
                    <p><i className="bi bi-star-fill"></i> {Math.round(item.popularity)}</p>
                )}

                {item.genres && item.genres.length > 0 && (
                    <p><i className="bi bi-tags-fill"></i> {item.genres.map((genre) => genre.name).join(", ")}</p>
                )}

                {item.runtime ? (
                    <p><i className="bi bi-clock-fill"></i> {item.runtime} minutes</p>
                ) : (
                    item.number_of_seasons && item.number_of_episodes && (
                        <p><i className="bi bi-film"></i> {item.number_of_seasons} {item.number_of_seasons === 1 ? 'Season' : 'Seasons'} ({item.number_of_episodes} {item.number_of_episodes === 1 ? 'episode' : 'episodes'})</p>
                    )
                )}

                {item.spoken_languages && item.spoken_languages.length > 0 && (
                    <p><i className="bi bi-globe2"></i> {item.spoken_languages.map((lang) => lang.english_name).join(", ")}</p>
                )}

                {item.production_countries && item.production_countries.length > 0 && (
                    <p><i className="bi bi-geo-alt-fill"></i> {item.production_countries.map((country) => country.name).join(", ")}</p>
                )}

                {item.production_companies && item.production_companies.length > 0 && (
                    <p><i className="bi bi-building-fill"></i> {item.production_companies.map((company) => company.name).join(", ")}</p>
                )}

                {item.release_date || item.first_air_date ? (
                    <p><i className="bi bi-calendar2-week-fill"></i> {item.release_date || item.first_air_date}</p>
                ) : null}
            </div>
        </div>
    );
}


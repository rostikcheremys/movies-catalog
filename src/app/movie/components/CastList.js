'use client';

export default function CastList({ cast }) {
    if (!cast.length) return null;

    return (
        <div className="cast-container">
            <h3>Top Billed Cast</h3>
            <div className="line-item"></div>
            <div className="overflow-auto">
                <ul className="cast-list">
                    {cast.map((member) => (
                        <li key={member.cast_id} className="cast-item">
                            {member.profile_path ? (
                                <img className="cast-photo"
                                     src={`https://image.tmdb.org/t/p/w185${member.profile_path}`}
                                     alt={member.name} />
                            ) : (
                                <div className="cast-photo-placeholder">
                                    <span><i className="bi bi-person-circle"></i></span>
                                </div>
                            )}
                            <p><strong>{member.name}</strong> <br/>{member.character}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

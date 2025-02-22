"use client";

export default function Card(item) {
    const voteAverage = item.vote_average;
    const title = item.title || item.name || 'No title available';

    return (
        <div key={item.id} className="col">
            <div className="card custom-card-body-color custom-rounded d-flex, flex-column, justify-content-between h-100">

                <div className={`custom-vote-average text-white start-0 top-0 p-1 fw-bold position-absolute 
                    ${voteAverage >= 8 ? "bg-success" : voteAverage >= 7 ? "bg-warning" : "bg-orange"}`}>
                    {voteAverage.toFixed(2)}
                </div>

                {item.adult && (
                    <div className="custom-adult text-white end-0 top-0 p-1 fw-bold position-absolute">+18</div>
                )}
                <img
                    src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                    className="w-100, h-auto, object-fit-cover, border-to custom-rounded-img"
                    alt={title}

                />
                <div className="card-body custom-card-body-color custom-rounded  pb-1 flex-grow-1 d-flex flex-column justify-content-start h-100">
                    <h5 className="card-title text-center text-truncate text-white d-block custom-max-width">
                        {title}
                    </h5>
                    <h6 className="text-center text-truncate text-white d-block custom-max-width custom-opacity">
                        {item.release_date ? item.release_date.slice(0, 4) : (item.first_air_date ? item.first_air_date.slice(0, 4) : 'N/A')}
                    </h6>
                </div>
            </div>
        </div>
    );
}
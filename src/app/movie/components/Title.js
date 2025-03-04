'use client';

export default function Title({ item }) {
    return (
        <div className="title-container card-body">
            <h5 className="title-item">
                {item.title || item.name || "No title available"}
            </h5>
            <h6 className="date-item">
                {item.release_date ? item.release_date.slice(0, 4) : item.first_air_date ? item.first_air_date.slice(0, 4) : "N/A"}
            </h6>
        </div>
    );
}


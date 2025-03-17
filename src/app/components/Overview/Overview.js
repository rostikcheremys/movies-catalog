'use client';

import "@/app/components/Overview/styles.css"

export default function Overview({ overview, trailerRef }) {
    return (
        overview && (
            <div className="overview-container">
                <h3>Overview</h3>
                <div className="line-item"></div>
                <p ref={trailerRef}>{overview}</p>
            </div>
        )
    );
}

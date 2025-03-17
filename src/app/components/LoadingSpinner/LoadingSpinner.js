'use client';

import "@/app/components/LoadingSpinner/styles.css"

export default function LoadingSpinner() {
    return (
        <div className="loading-item">
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
}

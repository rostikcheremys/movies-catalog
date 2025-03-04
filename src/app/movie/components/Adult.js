'use client';

export default function Adult({ item }) {
    return(
        item.adult && (
            <div className="adult-item">+18</div>
        )
    );
}


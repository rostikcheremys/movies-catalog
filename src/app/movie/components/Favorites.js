'use client';

import { useState } from "react";

export default function Favorites({ item }) {

    const [savedItems, setSavedItems] = useState([]);

    const handleSaveItem = (id, type) => {
        const mediaItem = { id, type };

        if (savedItems.some(saved => saved.id === id && saved.media_type === type)) {
            setSavedItems(savedItems.filter(saved => saved.id !== id || saved.media_type !== type));
        } else {
            setSavedItems([...savedItems, mediaItem]);
        }
    };

    return (
        <div className="button-favorites">
            <button className="btn" onClick={(e) => {
                e.stopPropagation(); handleSaveItem(item.id, item.media_type);}}>

                {savedItems.some(saved => saved.id === item.id && saved.media_type === item.media_type) ? (
                    <i className="bi bi-bookmark-fill"/>
                ) : (
                    <i className="bi bi-bookmark"/>
                )}
            </button>
        </div>
    );
}

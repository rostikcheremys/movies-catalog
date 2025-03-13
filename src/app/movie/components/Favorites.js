'use client';

import { useState, useEffect } from 'react';
import { addToFavorites, removeFromFavorites } from "@/app/favorites/components/favorites";

export default function Favorites({ item, itemType, details, userId, favorites, setFavorites }) {
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        if (userId && item && itemType) {
            setIsFavorite(favorites.some(fav => fav.item_id === item.id && fav.item_type === itemType));
        }
    }, [userId, item, itemType, favorites]);

    console.log(`User data:", ${userId}`);

    const handleToggleFavorite = async (e) => {
        e.stopPropagation();

        if (!userId) {
            alert("Будь ласка, увійдіть у профіль!");
            return;
        }

        const { poster_path, title, release_date, vote_average } = details;

        if (isFavorite) {
            await removeFromFavorites(userId, item.id, itemType, poster_path, title, release_date, vote_average);
            setFavorites(prev => prev.filter(fav => !(fav.item_id === item.id && fav.item_type === itemType)));
        } else {
            await addToFavorites(userId, item.id, itemType, poster_path, title, release_date, vote_average);
            setFavorites(prev => [...prev, { item_id: item.id, item_type: itemType }]);
        }

        setIsFavorite(!isFavorite);
    };

    return (
        <div className="button-favorites">
            <button className="btn" onClick={handleToggleFavorite}>
                {isFavorite ? <i className="bi bi-bookmark-fill" /> : <i className="bi bi-bookmark" />}
            </button>
        </div>
    );
}

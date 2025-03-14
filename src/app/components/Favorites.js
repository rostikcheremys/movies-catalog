'use client';

import { useState, useEffect } from 'react';

import { addToFavorites } from "@/app/favorites/utils/addToFavorites";
import { removeFromFavorites } from "@/app/favorites/utils/removeFromFavorites";

export default function Favorites({ item, itemType, details, userId, favorites, setFavorites, setCurrentPage }) {
    const [isFavorite, setIsFavorite] = useState(false);

    const handleToggleFavorite = async (e) => {
        e.stopPropagation();

        const { poster_path, title, name, release_date, first_air_date, vote_average } = details;

        if (isFavorite) {
            await removeFromFavorites(userId, item.id, itemType);
            setFavorites(prev => prev.filter(fav => !(fav.item_id === item.id && fav.item_type === itemType)));
            setIsFavorite(false);

            const remainingItems = favorites.filter(fav => fav.item_id !== item.id && fav.item_type === itemType);
            if (remainingItems.length === 0) setCurrentPage(1);

        } else {
            await addToFavorites(userId, item.id, itemType, poster_path, title, name, release_date, first_air_date, vote_average);

            setFavorites(prev => {
                const updatedFavorites = [...prev, { item_id: item.id, item_type: itemType }];
                const totalPages = Math.ceil(updatedFavorites.length / 20);
                const currentItemsInPage = (totalPages - 1) * 20;

                if (updatedFavorites.length > currentItemsInPage + 20) setCurrentPage(totalPages);
                return updatedFavorites;
            });

            setIsFavorite(true);
        }
    };

    useEffect(() => {
        if (userId && item && itemType) {
            setIsFavorite(favorites.some(fav => fav.item_id === item.id && fav.item_type === itemType));
        }
    }, [userId, item, itemType, favorites]);

    return (
        <div className="button-favorites">
            <button className="btn" onClick={handleToggleFavorite}>
                {isFavorite ? <i className="bi bi-bookmark-fill" /> : <i className="bi bi-bookmark" />}
            </button>
        </div>
    );
}

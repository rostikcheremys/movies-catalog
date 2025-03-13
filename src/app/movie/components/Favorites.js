'use client';

import { useEffect, useState } from 'react';
import { useUser } from "@/app/profile/components/useUser";
import { addToFavorites, getUserFavorites, removeFromFavorites } from "@/app/favorites/components/favorites";

export default function Favorites({ item, itemType, details }) {
    const { user } = useUser();
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        if (user && item && itemType) {
            getUserFavorites(user.id).then(favorites => {
                setIsFavorite(favorites.some(fav => fav.item_id === item.id && fav.item_type === itemType));
            });
        }
    }, [user, item, itemType]);


    const handleToggleFavorite = async (e) => {
        e.stopPropagation();

        if (!user) {
            alert("Будь ласка, увійдіть у профіль!");
            return;
        }

        const { poster_path, title, release_date, vote_average } = details;

        if (isFavorite) {
            await removeFromFavorites(user.id, item.id, itemType, poster_path, title, release_date, vote_average);
            setIsFavorite(false);
        } else {
            await addToFavorites(user.id, item.id, itemType, poster_path, title, release_date, vote_average);

            console.log("Adding to favorites:");
            console.log("User ID:", user.id);
            console.log("Item ID:", item.id);
            console.log("Item Type:", itemType);
            console.log("Image:", poster_path);
            console.log("Title:", title);
            console.log("Date:", release_date);
            console.log("Vote Average:", vote_average);

            setIsFavorite(true);
        }
    };

    return (
        <div className="button-favorites">
            <button className="btn" onClick={handleToggleFavorite}>
                {isFavorite ? <i className="bi bi-bookmark-fill" /> : <i className="bi bi-bookmark" />}
            </button>
        </div>
    );
}

'use client';

import { useEffect, useState } from "react";
import { getUserFavorites } from "@/app/favorites/utils/getUserFavorites";

export function useFavorites(user) {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        if (user) {
            getUserFavorites(user.id).then(setFavorites);
        }
    }, [user]);

    return { favorites, setFavorites };
}

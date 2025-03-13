'use client';

import supabase from '@/app/profile/components/SupabaseClient';
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import { useUser } from "@/app/profile/components/useUser";

// Додати в улюблені
export async function addToFavorites(userId, itemId, itemType, image, title, data, voteAverage) {
    const { data: result, error } = await supabase
        .from('favorites')
        .insert([{
            user_id: userId,
            item_id: itemId,
            item_type: itemType,
            image: image,
            title: title,
            data: data,
            vote_average: voteAverage
        }]);

        if (error) {
            console.error('Error adding to favorites:', error.message);
            return null;
        }

    return result;
}

// Видалити з улюблених
export async function removeFromFavorites(userId, itemId, itemType, image, title, data, voteAverage) {
    const { error } = await supabase
        .from('favorites')
        .delete()
        .eq('user_id', userId)
        .eq('item_id', itemId)
        .eq('item_type', itemType)
        .eq('image', image)
        .eq('title', title)
        .eq('data', data)
        .eq('vote_average', voteAverage);

    if (error) {
        console.error('Error removing from favorites:', error.message);
        return false;
    }

    return true;
}

export async function getUserFavorites(userId) {
    if (!userId) {
        console.error('User ID is required to fetch favorites');
        return [];
    }

    const { data, error } = await supabase
        .from('favorites')
        .select('*')
        .eq('user_id', userId);

    if (error) {
        console.error('Error fetching favorites:', error.message);
        return [];
    }

    console.log('Fetched favorites:', data);
    return data;
}
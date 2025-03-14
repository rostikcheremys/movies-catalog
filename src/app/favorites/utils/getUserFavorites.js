'use client';

import supabase from "@/app/profile/components/SupabaseClient";

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
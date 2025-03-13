'use client';

import supabase from "@/app/profile/components/SupabaseClient";

export async function removeFromFavorites(userId, itemId, itemType) {
    const { error } = await supabase
        .from('favorites')
        .delete()
        .eq('user_id', userId)
        .eq('item_id', itemId)
        .eq('item_type', itemType);

    if (error) {
        console.error('Error removing from favorites:', error.message);
        return false;
    }

    return true;
}
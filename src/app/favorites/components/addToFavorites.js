'use client';

import supabase from '@/app/profile/components/SupabaseClient';

export async function addToFavorites(userId, itemId, itemType, image, title, tvName, data, tvDate, voteAverage){
    const { data: result, error } = await supabase
        .from('favorites')
        .insert([{
            user_id: userId,
            item_id: itemId,
            item_type: itemType,
            image: image,
            title: title,
            data: data,
            tv_name: tvName,
            tv_date: tvDate,
            vote_average: voteAverage
        }]);

    if (error) {
        console.error('Error adding to favorites:', error.message);
        return null;
    }

    return result;
}
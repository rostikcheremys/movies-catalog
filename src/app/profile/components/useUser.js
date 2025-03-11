'use client';

import { useEffect, useState } from "react";

import supabase from '@/app/profile/components/SupabaseClient';

export const useUser = () => {
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
            if (user) {
                const { data: profileData } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', user.id)
                    .single();
                setProfile(profileData);
            }
        };
        fetchUser();
    }, []);

    return { user, profile };
};

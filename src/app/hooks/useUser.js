'use client';

import { useEffect, useState } from 'react';
import supabase from '../profile/components/SupabaseClient';

export function useUser() {
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getUser = async () => {
            setLoading(true);
            const { data: { user } } = await supabase.auth.getUser();

            setUser(user);

            if (user) {
                const { data: profile } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', user.id)
                    .single();

                setProfile(profile);
            }

            setLoading(false);
        };

        getUser();
    }, []);

    return { user, profile, loading };
}

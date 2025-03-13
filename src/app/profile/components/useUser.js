import { useEffect, useState } from 'react';
import supabase from './SupabaseClient';

export function useUser() {
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);

            if (user) {
                let { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single();
                setProfile(profile);
            }
        };

        getUser();
    }, []);

    return { user, profile };
}

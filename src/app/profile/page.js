'use client';

import Link from "next/link";

import { useEffect, useState } from "react";
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_KEY
);

export default function Page() {
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

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        setUser(null);
        setProfile(null);
    };

    return (
        <div className="container">
            {user ? (
                <div className="profile-container">
                    <div className="card-profile">
                        <div className="card-body-profile">
                            <h4>Welcome, {profile?.first_name}</h4>
                            <i className="bi bi-person-fill"></i>
                            <button className="btn-custom" onClick={handleSignOut}>Sign Out</button>
                        </div>
                    </div>
                </div>
                ) : (
                <div className="profile-container">
                    <div className="card-profile">
                        <div className="card-body-profile">
                            <h4>Hello, welcome!</h4>
                            <i className="bi bi-person-fill"></i>

                            <Link href="/profile/sign-in">
                                <button type="button" className="btn-custom-white">Sign In</button>
                            </Link>

                            <Link href="/profile/sign-up">
                                <button type="button" className="btn-custom">Sign Up</button>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

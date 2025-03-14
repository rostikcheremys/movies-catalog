'use client';

import './profile.css';
import { useRouter } from 'next/navigation';
import { GuestProfile } from "@/app/profile/components/GuestProfile";
import { UserProfile } from "@/app/profile/components/UserProfile";
import { useUser } from "@/app/hooks/useUser";
import supabase from '@/app/profile/components/SupabaseClient';
import LoadingSpinner from "@/app/components/LoadingSpinner";

export default function Page() {
    const { user, profile } = useUser();
    const router = useRouter();

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push('/');
    };

    if (user === undefined) return <LoadingSpinner />;

    return (
        <div className="container">
            <div className="profile-container">
                <div className="card-profile">
                    {user ? (
                        <UserProfile profile={profile} handleSignOut={handleSignOut} />
                    ) : (
                        <GuestProfile />
                    )}
                </div>
            </div>
        </div>
    );
}

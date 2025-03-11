'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import LoadingSpinner from "@/app/movie/components/LoadingSpinner";

import supabase from '@/app/profile/components/SupabaseClient';

export const useSignIn = () => {
    const [error, setError] = useState(null);
    const router = useRouter();


    const handleSignIn = async (formData) => {
        setError(null);

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(formData.email)) {
            setError("Must have a valid email format (e.g., example@domain.com).");
            return;
        }

        if (!formData.email || !formData.password) {
            setError("Please fill in all required fields.");
            return;
        }

        const { error } = await supabase.auth.signInWithPassword({
            email: formData.email,
            password: formData.password
        });

        if (error) {
            setError(error.message);
        } else {
            router.push('/profile/callback?success=true');
        }
    };


    return { handleSignIn, error };
};

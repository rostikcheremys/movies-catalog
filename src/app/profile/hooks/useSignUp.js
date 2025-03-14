'use client';

import bcrypt from 'bcryptjs';
import supabase from '@/app/profile/components/SupabaseClient';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export const useSignUp = () => {
    const [error, setError] = useState(null);
    const router = useRouter();

    const handleSignUp = async (formData) => {
        setError(null);

        if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.repeatPassword) {
            setError("Please fill in all required fields.");
            return;
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(formData.email)) {
            setError("Must have a valid email format (e.g., example@domain.com).");
            return;
        }

        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{7,}$/;
        if (!passwordRegex.test(formData.password)) {
            setError("Password must contain at least one number, one uppercase letter, one special character, and be at least 7 characters long.");
            return;
        }

        if (formData.password !== formData.repeatPassword) {
            setError("Passwords do not match");
            return;
        }

        if (!formData.termsAccepted) {
            setError("You must accept the terms and conditions.");
            return;
        }

        const hashedPassword = await bcrypt.hash(formData.password, 10);

        const { data, error } = await supabase.auth.signUp({
            email: formData.email,
            password: formData.password,
            options: {
                emailRedirectTo: 'http://localhost:3000/profile/sign-in'
            }
        });

        if (error) {
            setError(error.message);
        } else {
            if (data.user) {
                await supabase.from('profiles').insert([
                    {
                        id: data.user.id,
                        first_name: formData.firstName,
                        last_name: formData.lastName,
                        email: formData.email,
                        password_hash: hashedPassword,
                        secret_question: formData.secretQuestion,
                        answer: formData.answer,
                        terms_accepted: formData.termsAccepted
                    }
                ]);
            }
            router.push('/profile/callback');
        }
    };

    return { handleSignUp, error };
};

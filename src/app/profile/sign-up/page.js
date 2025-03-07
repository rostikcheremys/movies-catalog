'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import bcrypt from 'bcryptjs'; // Додаємо бібліотеку для хешування пароля

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_KEY
);

export default function AuthPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        repeatPassword: '',
        firstName: '',
        lastName: '',
        secretQuestion: '',
        answer: ''
    });
    const [error, setError] = useState(null);
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

    const handleSignUp = async (e) => {
        e.preventDefault();
        setError(null);

        if (formData.password !== formData.repeatPassword) {
            setError("Passwords do not match");
            return;
        }

        // Хешуємо пароль
        const hashedPassword = await bcrypt.hash(formData.password, 10);

        const { data, error } = await supabase.auth.signUp({
            email: formData.email,
            password: formData.password
        });
        if (error) {
            setError(error.message);
        } else {
            if (data.user) {
                // Вставляємо новий профіль разом з хешем пароля
                await supabase.from('profiles').insert([
                    {
                        id: data.user.id,
                        first_name: formData.firstName,
                        last_name: formData.lastName,
                        email: formData.email, // Додаємо email для зручності
                        password_hash: hashedPassword, // Зберігаємо хеш пароля
                        secret_question: formData.secretQuestion,
                        answer: formData.answer
                    }
                ]);
            }
            alert('Check your email to confirm your account!');
        }
    };

    const handleSignIn = async (e) => {
        e.preventDefault();
        setError(null);
        const { data, error } = await supabase.auth.signInWithPassword({
            email: formData.email,
            password: formData.password
        });
        if (error) {
            setError(error.message);
        } else {
            router.push('/profile');
        }
    };

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        setUser(null);
        setProfile(null);
    };

    return (
        <div className="container">
            {user ? (
                <div>
                    <h4>Welcome, {profile?.first_name || user.email}!</h4>
                    <button onClick={handleSignOut}>Sign Out</button>
                </div>
            ) : (
                <div className="container">
                    <div className="auth-container">
                        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                            <div className="card-auth">
                                <div className="card-body-auth">
                                    <h4>Sign Up</h4>
                                    {error && <p className="error-message">{error}</p>}
                                    <form>
                                        <div className={"item-form"}>
                                            <input
                                                type="text"
                                                placeholder="First Name"
                                                className="form-control"
                                                value={formData.firstName}
                                                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                                            />
                                        </div>

                                        <div className={"item-form"}>
                                            <input
                                                type="text"
                                                placeholder="Last Name"
                                                className="form-control"
                                                value={formData.lastName}
                                                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                                            />
                                        </div>
                                        <div className={"item-form"}>
                                            <input
                                                type="email"
                                                placeholder="Email"
                                                className="form-control"
                                                value={formData.email}
                                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                            />
                                        </div>
                                        <div className={"item-form"}>
                                            <input
                                                type="password"
                                                placeholder="Password"
                                                className="form-control"
                                                value={formData.password}
                                                onChange={(e) => setFormData({
                                                    ...formData,
                                                    password: e.target.value
                                                })}
                                            />
                                        </div>
                                        <div className={"item-form"}>
                                            <input
                                                type="password"
                                                placeholder="Repeat Password"
                                                className="form-control"
                                                value={formData.repeatPassword}
                                                onChange={(e) => setFormData({
                                                    ...formData,
                                                    repeatPassword: e.target.value
                                                })}
                                            />
                                        </div>
                                        <div className={"item-form"}>
                                            <select
                                                value={formData.secretQuestion}
                                                className="form-select"
                                                onChange={(e) => setFormData({
                                                    ...formData,
                                                    secretQuestion: e.target.value
                                                })}
                                            >
                                                <option value="" disabled>Secret Question</option>
                                                <option value="pet">What is your first pet's name?
                                                </option>
                                                <option value="city">In which city were you born?
                                                </option>
                                                <option value="teacher">What was the name of your first teacher?
                                                </option>
                                            </select>
                                        </div>
                                        <div className={"item-form"}>
                                            <input
                                                type="text"
                                                placeholder="Your Answer"
                                                className="form-control"
                                                value={formData.answer}
                                                onChange={(e) => setFormData({
                                                    ...formData,
                                                    answer: e.target.value
                                                })}
                                            />
                                        </div>
                                        <button className="btn-sign" onClick={handleSignUp}>Sign Up</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

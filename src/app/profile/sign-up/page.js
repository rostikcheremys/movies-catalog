'use client';

import bcrypt from 'bcryptjs';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_KEY
);

export default function Page() {
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

    const router = useRouter();

    const handleSignUp = async (e) => {
        e.preventDefault();
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
                        answer: formData.answer
                    }
                ]);
            }
            router.push('/profile/callback')
        }
    };

    return (
        <div className="container">
                <div className="container">
                    <div className="auth-container">
                        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                            <div className="card-auth">
                                <div className="card-body-auth">
                                    <h4>Sign Up</h4>
                                    {error && <p className="error-message">{error}</p>}
                                    <form>
                                        <div className={"item-form"}>
                                            <input type="text" placeholder="First Name*" className="form-control"
                                                   value={formData.firstName} onChange={(e) =>
                                                setFormData({...formData, firstName: e.target.value})}/>
                                        </div>

                                        <div className={"item-form"}>
                                            <input type="text" placeholder="Last Name*" className="form-control"
                                                   value={formData.lastName} onChange={(e) =>
                                                setFormData({...formData, lastName: e.target.value})}/>
                                        </div>

                                        <div className={"item-form"}>
                                            <input type="email" placeholder="Email*" className="form-control"
                                                   value={formData.email} onChange={(e) =>
                                                setFormData({...formData, email: e.target.value})}/>
                                        </div>

                                        <div className={"item-form"}>
                                            <input
                                                type="password"
                                                placeholder="Password*"
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
                                                placeholder="Repeat Password*"
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
        </div>
    );
}

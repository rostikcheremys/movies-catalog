'use client';

import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_KEY
);

export default function Page() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [error, setError] = useState(null);

    const handleSignIn = async (e) => {
        e.preventDefault();
        setError(null);

        const { error } = await supabase.auth.signInWithPassword({
            email: formData.email,
            password: formData.password
        });

        if (error) {
            setError(error.message);
        } else {
            router.push('/');
        }
    };

    return (
        <div className="container">
            <div className="auth-container">
                <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                    <div className="card-auth">
                        <div className="card-body-auth">
                            <h4>Sign In</h4>
                            {error && <p className="error-message">{error}</p>}
                            <form>
                                <div className="item-form">
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        className="form-control"
                                        value={formData.email}
                                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    />
                                </div>
                                <div className="item-form">
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        className="form-control"
                                        value={formData.password}
                                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                                    />
                                </div>
                                <button className="btn-sign" onClick={handleSignIn}>Sign In</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
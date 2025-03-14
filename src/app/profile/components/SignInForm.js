'use client';

import Link from "next/link";

import { useState } from 'react';
import {useSignIn} from "@/app/profile/hooks/useSignIn";

export default function SignInForm() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [showPassword, setShowPassword] = useState(false);

    const { handleSignIn, error } = useSignIn ();

    const onSubmit = (e) => {
        e.preventDefault();
        handleSignIn(formData);
    };

    return (
        <form onSubmit={onSubmit}>
            {error && <p className="error-message">{error}</p>}

            <div className="item-form">
                <input type="email" placeholder="Email*" className="form-control"
                       value={formData.email} onChange={(e) =>
                    setFormData({...formData, email: e.target.value})}/>
            </div>

            <div className="item-form">
                <input type={showPassword ? "text" : "password"} placeholder="Password*" className="form-control"
                       value={formData.password} onChange={(e) =>
                    setFormData({...formData, password: e.target.value})}/>

                <i className={`bi ${showPassword ? "bi-eye-fill" : "bi-eye-slash-fill"}`}
                   onClick={() => setShowPassword(!showPassword)}></i>
            </div>

            <button className="btn-custom" onClick={handleSignIn}>Sign In</button>

            <p className="link-sign">Don't have an account?
                <Link href="/profile/sign-up"> Sign Up</Link>
            </p>
        </form>
    );
}
'use client';

import Link from "next/link";

import { useState } from 'react';
import { useSignUp } from '@/app/profile/components/useSignUp';

export default function SignUpForm() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        repeatPassword: '',
        firstName: '',
        lastName: '',
        secretQuestion: '',
        answer: '',
        termsAccepted: false
    });

    const { handleSignUp, error } = useSignUp();

    return (
        <form>
            {error && <p className="error-message">{error}</p>}

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
                <input type="password" placeholder="Password*" className="form-control"
                       value={formData.password} onChange={(e) =>
                    setFormData({...formData, password: e.target.value})}/>
            </div>

            <div className={"item-form"}>
                <input type="password" placeholder="Repeat Password*" className="form-control"
                       value={formData.repeatPassword} onChange={(e) =>
                    setFormData({...formData, repeatPassword: e.target.value})}/>
            </div>

            <div className={"item-form"}>
                <select className="form-select" value={formData.secretQuestion}
                        onChange={(e) =>
                            setFormData({...formData, secretQuestion: e.target.value})}>
                    <option value="" disabled>Secret Question</option>
                    <option value="pet">What is your first pet's name?</option>
                    <option value="city">In which city were you born?</option>
                    <option value="teacher">What was the name of your first teacher?</option>
                </select>
            </div>

            <div className={"item-form"}>
                <input type="text" placeholder="Your Answer" className="form-control"
                       value={formData.answer} onChange={(e) =>
                    setFormData({...formData, answer: e.target.value})}/>
            </div>

            <div className={"item-form"}>
                <div className="item-form">
                    <input type="checkbox" checked={formData.termsAccepted}
                           onChange={(e) =>
                               setFormData({...formData, termsAccepted: e.target.checked})}/>
                    <label className="form-check-label">I accept the terms and conditions</label>
                </div>
            </div>

                <button className="btn-custom" onClick={(e) => {
                    e.preventDefault();
                    handleSignUp(formData);
                }}>Sign Up
                </button>

                <p className="link-sign">
                    Already have an account?
                    <Link href="/profile/sign-in"> Sign In</Link>
                </p>
        </form>
);
}

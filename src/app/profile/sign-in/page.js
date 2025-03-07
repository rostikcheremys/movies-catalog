'use client';

import { useState } from "react";
import Link from "next/link";

export default function Page() {
    const SignIn = () => {
        const [formData, setFormData] = useState({
            email: "",
            password: "",
            termsAccepted: false,
        });

        const [errors, setErrors] = useState({});
        const [showPassword, setShowPassword] = useState(false);

        const validate = () => {
            let newErrors = {};

            if (!formData.email) {
                newErrors.email = "Email is required";
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
                newErrors.email = "Invalid email format";
            }
            if (!formData.password) {
                newErrors.password = "Password is required";
            } else if (
                !/(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{7,}/.test(formData.password)
            ) {
                newErrors.password =
                    "Password must contain at least one number, one uppercase letter, one special character, and be at least 7 characters long";
            }

            if (!formData.termsAccepted) {
                newErrors.termsAccepted = "You must accept the terms of use";
            }

            setErrors(newErrors);
            return Object.keys(newErrors).length === 0;
        };

        const handleSubmit = (e) => {
            e.preventDefault();
            if (validate()) {
                alert("Form submitted successfully");
            }
        };

        const firstError = Object.values(errors)[0];

        return (
            <div className="container">
                <div className="auth-container">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="card-auth">
                            <div className="card-body-auth">
                                <h4>Sign In</h4>

                                {firstError && <p className="error-message">{firstError}</p>}

                                <form onSubmit={handleSubmit}>

                                    <div className={`item-form ${errors.email ? 'error' : ''}`}>
                                        <input
                                            type="email"
                                            placeholder="Email"
                                            className="form-control"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>

                                    <div className={`item-form ${errors.password ? 'error' : ''}`}>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Password"
                                            className="form-control"
                                            value={formData.password}
                                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                                        />
                                        <i className={`bi ${showPassword ? "bi-eye-fill" : "bi-eye-slash-fill"}`}
                                           onClick={() => setShowPassword(!showPassword)}></i>
                                    </div>

                                    <div className={`item-form ${errors.termsAccepted ? 'error' : ''}`}>
                                        <input
                                            type="checkbox"
                                            checked={formData.termsAccepted}
                                            onChange={(e) => setFormData({ ...formData, termsAccepted: e.target.checked })}
                                            className="form-check-input"
                                        />
                                        <label className="form-check-label">I accept the terms</label>
                                    </div>

                                    <button type="submit" className="btn-sign">Sign In</button>

                                    <p className="link-sign">Don't have an account?
                                        <Link href="/sign-up"> Sign Up</Link>
                                    </p>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return <SignIn />;
}

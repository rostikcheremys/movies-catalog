'use client';

import { useState } from "react";
import Link from "next/link";

export default function Page() {
    const SignUp = () => {
        const [formData, setFormData] = useState({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            repeatPassword: "",
            secretQuestion: "",
            answer: "",
            termsAccepted: false,
        });

        const [errors, setErrors] = useState({});
        const [showPassword, setShowPassword] = useState(false);
        const [showRepeatPassword, setShowRepeatPassword] = useState(false);

        const validate = () => {
            let newErrors = {};

            if (!formData.firstName) newErrors.firstName = "First name is required";
            if (!formData.lastName) newErrors.lastName = "Last name is required";
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
            if (!formData.repeatPassword) {
                newErrors.repeatPassword = "Please repeat your password";
            } else if (formData.password !== formData.repeatPassword) {
                newErrors.repeatPassword = "Passwords do not match";
            }
            if (!formData.secretQuestion) {
                newErrors.secretQuestion = "Please select a secret question";
            }
            if (!formData.answer) {
                newErrors.answer = "Please provide an answer";
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
                                <h4>Sign Up</h4>

                                {firstError && <p className="error-message">{firstError}</p>}

                                <form onSubmit={handleSubmit}>
                                    {/* First Name */}
                                    <div className={`item-form ${errors.firstName ? 'error' : ''}`}>
                                        <input
                                            type="text"
                                            placeholder="First Name"
                                            className="form-control"
                                            value={formData.firstName}
                                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                        />
                                    </div>

                                    {/* Last Name */}
                                    <div className={`item-form ${errors.lastName ? 'error' : ''}`}>
                                        <input
                                            type="text"
                                            placeholder="Last Name"
                                            className="form-control"
                                            value={formData.lastName}
                                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                        />
                                    </div>

                                    {/* Email */}
                                    <div className={`item-form ${errors.email ? 'error' : ''}`}>
                                        <input
                                            type="email"
                                            placeholder="Email"
                                            className="form-control"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>

                                    {/* Password */}
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

                                    {/* Repeat Password */}
                                    <div className={`item-form ${errors.repeatPassword ? 'error' : ''}`}>
                                        <input
                                            type={showRepeatPassword ? "text" : "password"}
                                            placeholder="Repeat Password"
                                            className="form-control"
                                            value={formData.repeatPassword}
                                            onChange={(e) => setFormData({...formData, repeatPassword: e.target.value})}
                                        />
                                        <i className={`bi ${showRepeatPassword ? "bi-eye-fill" : "bi-eye-slash-fill"}`} onClick={() => setShowRepeatPassword(!showRepeatPassword)}></i>
                                    </div>

                                    {/* Secret Question */}
                                    <div className={`item-form ${errors.secretQuestion ? 'error' : ''}`}>
                                        <select className="form-select" value={formData.secretQuestion} onChange={(e) => setFormData({ ...formData, secretQuestion: e.target.value })}>
                                            <option value="" disabled>Secret Question</option>
                                            <option value="pet">What is your first pet's name?</option>
                                            <option value="city">In which city were you born?</option>
                                            <option value="teacher">What was the name of your first teacher?</option>
                                        </select>
                                    </div>

                                    {/* Answer */}
                                    <div className={`item-form ${errors.answer ? 'error' : ''}`}>
                                        <input
                                            type="text"
                                            placeholder="Your Answer"
                                            className="form-control"
                                            value={formData.answer}
                                            onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                                        />
                                    </div>

                                    {/* Terms Acceptance */}
                                    <div className={`item-form ${errors.termsAccepted ? 'error' : ''}`}>
                                        <input
                                            type="checkbox"
                                            checked={formData.termsAccepted}
                                            onChange={(e) => setFormData({ ...formData, termsAccepted: e.target.checked })}
                                            className="form-check-input"
                                        />
                                        <label className="form-check-label">I accept the terms</label>
                                    </div>

                                    {/* Submit Button */}
                                    <button type="submit" className="btn-sign">Sign Up</button>
                                    <p className="link-sign">Already have an account?
                                        <Link href="/sign-in"> Sign In</Link>
                                    </p>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return <SignUp />;
}

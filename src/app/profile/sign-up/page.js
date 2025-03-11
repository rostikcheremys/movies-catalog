'use client';

import '@/app/profile/profile.css'

import SignUpForm from '@/app/profile/components/SignUpForm';

export default function SignUpPage() {
    return (
        <div className="container">
            <div className="auth-container">
                <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                    <div className="card-auth">
                        <div className="card-body-auth">
                            <h4>Sign Up</h4>
                            <SignUpForm />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

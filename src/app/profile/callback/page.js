'use client';

import '@/app/profile/styles.css'

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function Callback() {
    const [isEmailSent, setIsEmailSent] = useState(false);
    const [isSignIn, setIsSignIn] = useState(false);

    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const success = searchParams.get('success');

        if (success === 'true') {
            setIsSignIn(true);
        }
    }, [searchParams]);

    useEffect(() => {
        if (isSignIn) {
            setTimeout(() => {
                router.push('/');
            }, 3000);
        }
    }, [isSignIn, router]);

    return (
        <div className="container">
            <div className="auth-container">
                <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                    <div className="card-auth">
                        <div className="card-body-auth">
                            {isSignIn ? (
                                <div>
                                    <h4>Sign In Successful</h4>
                                    <p>Redirecting to your profile...</p>
                                </div>
                            ) : (
                                <div>
                                    <h4>Account Confirmation</h4>
                                    <p>
                                        A confirmation email has been sent to your email address.
                                        Please check your inbox and follow the instructions to verify your email.
                                    </p>
                                    <p>If you didn't receive the email, you can try again.</p>

                                    <button className="btn-custom" onClick={() => setIsEmailSent(true)}>
                                        Resend
                                    </button>

                                    {isEmailSent && (
                                        <p className="email-sent">An email has been sent. Please check your inbox!</p>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

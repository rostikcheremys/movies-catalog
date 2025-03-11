'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function Callback() {
    const [isEmailSent, setIsEmailSent] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const success = searchParams.get('success');

        if (success === 'true') {
            setIsLoggedIn(true);
        }
    }, [searchParams]);

    useEffect(() => {
        if (isLoggedIn) {
            setTimeout(() => {
                router.push('/');
            }, 3000);
        }
    }, [isLoggedIn, router]);

    return (
        <div className="container">
            <div className="auth-container">
                <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                    <div className="card-auth">
                        <div className="card-body-auth">
                            {isLoggedIn ? (
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

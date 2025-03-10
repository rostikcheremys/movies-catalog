'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Callback() {
    /*const router = useRouter();*/
    const [isEmailSent, setIsEmailSent] = useState(false);

    return (
        <div className="container">
            <div className="auth-container">
                <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                    <div className="card-auth">
                        <div className="card-body-auth">
                            <h4>Account Confirmation</h4>
                            <p>
                                A confirmation email has been sent to your email address.
                                Please check your inbox and follow the instructions to verify your email.
                            </p>
                            <p>If you didn't receive the email, you can try again.</p>
                            <button className="btn-sign" onClick={() => setIsEmailSent(true)}>
                                Resend
                            </button>
                            {isEmailSent && (
                                <p>An email has been sent. Please check your inbox!</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

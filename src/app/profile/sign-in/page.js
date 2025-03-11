'use client';

'use client';

import SignInForm from '@/app/profile/components/SignInForm';


export default function SignInPage() {

    return (
        <div className="container">
            <div className="auth-container">
                <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                    <div className="card-auth">
                        <div className="card-body-auth">
                            <h4>Sign In</h4>
                            <SignInForm/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

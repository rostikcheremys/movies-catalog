'use client';

import Link from "next/link";

export default function Page() {
    return (
        <div className="container">

            <div className="container">
                <div className="profile-container">
                    <div className="card-profile">
                        <div className="card-body-profile">
                            <h4>Hello, welcome!</h4>
                            <i className="bi bi-person-fill"></i>
                            <Link href="/profile/sign-in">
                                <button type="button" className="btn-sign-profile">Sign In</button>
                            </Link>

                            <Link href="/profile/sign-up">
                                <button type="button" className="btn-sign">Sign Up</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
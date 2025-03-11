'use client';

import Link from "next/link";

export const GuestProfile = () => (
    <div className="card-body-profile">
            <h4>Hello, welcome!</h4>
        <i className="bi bi-person-fill"></i>

        <Link href="/profile/sign-in">
            <button type="button" className="btn-custom-white">Sign In</button>
        </Link>

        <Link href="/profile/sign-up">
            <button type="button" className="btn-custom">Sign Up</button>
        </Link>
    </div>
);
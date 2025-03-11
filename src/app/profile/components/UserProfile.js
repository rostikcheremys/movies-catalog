'use client';

export const UserProfile = ({profile, handleSignOut }) => (
    <div className="card-body-profile">
        <h4>Welcome, {profile?.first_name}</h4>
        <i className="bi bi-person-fill"></i>
        <button className="btn-custom" onClick={handleSignOut}>Sign Out</button>
    </div>
);
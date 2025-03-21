'use client';

import {useEffect, useState} from "react";

export const UserProfile = ({ profile, handleSignOut }) => {

    return (
        <div className="card-body-profile">
            <h4>Welcome, {profile?.first_name}</h4>
            <i className="bi bi-person-fill"></i>
            <button className="btn-custom" onClick={handleSignOut}>Sign Out</button>
        </div>
    );
};

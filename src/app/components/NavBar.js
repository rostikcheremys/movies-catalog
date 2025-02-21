"use client";


import {usePathname} from "next/navigation";
import {useEffect, useState} from "react";
import Link from "next/link";

export default function NavBar() {
    const pathName = usePathname();
    const [activePath, setActivePath] = useState("");
    const activeItem = (path) => activePath === path ? {color: "red"} : {color: "white"};

    useEffect( () => {
        setActivePath(pathName)
    },[pathName]);

    return (
        <nav className="navbar navbar-expand-lg navbar-dark fixed-top custom-navbar-color custom-min-height">
            <div className="container-fluid custom-navbar-color">
                <Link className="navbar-brand ms-3 fs-3" href="/">Name</Link>
                <button className="navbar-toggler me-3" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse m-3" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto fs-4">
                        <li className="nav-item me-3">
                            <Link className="nav-link" href="/" style={activeItem("/")}>Movies</Link>

                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" href="/tv-shows" style={activeItem("/tv-shows")}>TV Shows</Link>
                        </li>
                    </ul>
                    <form className="d-flex mt-1" role="search">
                        <input className="form-control me-3" type="search" placeholder="Search.." aria-label="Search"/>
                        <button className="btn btn-outline-light" type="submit">Search</button>
                    </form>
                </div>
            </div>
        </nav>
    );
}

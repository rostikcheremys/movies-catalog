'use client'

import {useEffect, useState} from "react";
import {usePathname, useRouter} from "next/navigation";

import Link from "next/link";
import "@/app/components/NavBar/styles.css"

export default function NavBar() {
    const [query, setQuery] = useState("");
    const router = useRouter();
    const pathname = usePathname();

    const handleInputChange = (e) => { setQuery(e.target.value) };

    useEffect(() => {
        import('bootstrap/dist/js/bootstrap.bundle.min.js');
    }, []);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const queryParam = urlParams.get('query');
        if (queryParam) {
            setQuery(queryParam);
        } else {
            setQuery("");
        }
    }, [pathname]);

    useEffect(() => {
        if (query.trim() !== "") router.push(`/search?query=${query}`);
    }, [query, router]);

    useEffect(() => {
        if (pathname.includes("/search") && query === "") router.push("/");

        if (!pathname.includes("/search")) setQuery("");
    }, [pathname, query, router]);

    return (
        <nav className="navbar navbar-expand-lg navbar-dark">
            <div className="container-fluid">
                <Link className="name-item" href="/"><i className="bi bi-film"></i> MovieNest</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className={`nav-link ${pathname === "/" ? "active" : ""}`} href="/">Movies</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${pathname === "/tv" ? "active" : ""}`} href="/tv">TV
                                Shows</Link>
                        </li>
                    </ul>

                    <form className="search-item" role="search">
                        <input className="form-control " type="search" placeholder="Search.." aria-label="Search"
                               value={query} onChange={handleInputChange}/>
                    </form>

                    <ul className="navbar-action">
                        <li className="action-icon favorites-item">
                            <Link className={`nav-link ${pathname === "/favorites" ? "active" : ""}`} href="/favorites">
                                <i className="bi bi-bookmark-fill"></i><span>Favorites</span></Link>

                        </li>
                        <li className="action-icon user-item">
                            <Link className={`nav-link ${pathname === "/profile" ? "active" : ""}`} href="/profile">
                                <i className="bi bi-person-fill"></i><span>Profile</span></Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

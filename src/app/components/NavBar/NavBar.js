'use client'

import {useEffect, useState, useRef} from "react";
import {usePathname, useRouter} from "next/navigation";
import Link from "next/link";
import "@/app/components/NavBar/styles.css"

export default function NavBar() {
    const [query, setQuery] = useState("");
    const [isNavbarOpen, setIsNavbarOpen] = useState(false); // Стан для відстеження відкриття навбару
    const navbarRef = useRef(null);
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

    const handleNavbarClose = () => {
        setIsNavbarOpen(false); // Закриваємо навбар
    };

    const handleClickOutside = (event) => {
        if (navbarRef.current && !navbarRef.current.contains(event.target)) {
            handleNavbarClose(); // Якщо клік був поза навбаром, закриваємо його
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    return (
        <nav className="navbar navbar-expand-lg navbar-dark" ref={navbarRef}>
            <div className="container-fluid">
                <Link className="name-item" href="/" onClick={handleNavbarClose}>
                    <i className="bi bi-film"></i> MovieNest
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded={isNavbarOpen ? "true" : "false"}
                        aria-label="Toggle navigation" onClick={() => setIsNavbarOpen(!isNavbarOpen)}>
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`collapse navbar-collapse ${isNavbarOpen ? "show" : ""}`} id="navbarSupportedContent">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className={`nav-link ${pathname === "/" ? "active" : ""}`} href="/" onClick={handleNavbarClose}>Movies</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${pathname === "/tv" ? "active" : ""}`} href="/tv" onClick={handleNavbarClose}>TV Shows</Link>
                        </li>
                    </ul>

                    <form className="search-item" role="search">
                        <input className="form-control" type="search" placeholder="Search.." aria-label="Search"
                               value={query} onChange={handleInputChange} />
                    </form>

                    <ul className="navbar-action">
                        <li className="action-icon favorites-item">
                            <Link className={`nav-link ${pathname === "/favorites" ? "active" : ""}`} href="/favorites" onClick={handleNavbarClose}>
                                <i className="bi bi-bookmark-fill"></i><span>Favorites</span>
                            </Link>
                        </li>
                        <li className="action-icon user-item">
                            <Link className={`nav-link ${pathname === "/profile" ? "active" : ""}`} href="/profile" onClick={handleNavbarClose}>
                                <i className="bi bi-person-fill"></i><span>Profile</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

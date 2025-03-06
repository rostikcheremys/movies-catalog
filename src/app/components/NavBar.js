'use client'

import {usePathname, useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import Link from "next/link";


export default function NavBar() {
    const [query, setQuery] = useState("");
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        console.log(query);
        query ? router.push(`/search?query=${query}`) : router.push("/");
    }, [query, router]);

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
                        <input className="form-control" type="search" placeholder="Search.." aria-label="Search" value={query}
                               onChange={(e) => setQuery(e.target.value)}/>
                    </form>

                    <ul className="navbar-action">
                        <li className="action-icon mark-favorites-item">
                            <Link className={`nav-link ${pathname === "/" ? "active" : ""}`} href="/">
                                <i className="bi bi-bookmark-fill"></i></Link>
                        </li>
                        <li className="action-icon user-item">
                            <Link className={`nav-link ${pathname === "/auth" ? "active" : ""}`} href="/auth">
                                <i className="bi bi-person-fill"></i></Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
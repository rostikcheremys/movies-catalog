'use client'

import {usePathname, useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import Link from "next/link";

export default function NavBar() {
    const pathName = usePathname();
    const [activePath, setActivePath] = useState("");
    const [query, setQuery] = useState("");
    const router = useRouter();
    const activeItem = (path) => activePath === path ? {color: "red"} : {color: "white"};

    useEffect( () => {
        setActivePath(pathName)
    },[pathName]);

    useEffect(() => {
        console.log(query);
        query ? router.push(`/search?query=${query}`) : router.push("/");
    }, [query, router]);

    return (
        <nav className="navbar navbar-expand-lg navbar-dark fixed-top custom-navbar-color custom-min-height">
            <div className="container-fluid custom-navbar-color">
                <Link className="name-item ms-3 fs-3" href="/">MovieNest</Link>
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
                            <Link className="nav-link" href="/tv" style={activeItem("/tv")}>TV Shows</Link>
                        </li>
                    </ul>
                    <form className="d-flex mt-1" role="search">
                        <input className="form-control " type="search" placeholder="Search.." aria-label="Search" value={query}
                               onChange={(e) => setQuery(e.target.value)}/>
                    </form>
                </div>
            </div>
        </nav>
    );
}
"use client";

export default function NavBar({ isTvShows, setIsTvShows }) {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark fixed-top custom-navbar-color custom-min-height">
            <div className="container-fluid custom-navbar-color">
                <a className="navbar-brand ms-3 fs-3" href="#">Name</a>
                <button className="navbar-toggler me-3" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse m-3" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto fs-4">
                        <li className="nav-item me-3">
                            <a className={`nav-link ${!isTvShows ? "active text-warning" : ""}`}
                               href="#"
                               onClick={() => setIsTvShows(false)}>
                                Movies
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className={`nav-link ${isTvShows ? "active text-warning" : ""}`}
                               href="#"
                               onClick={() => setIsTvShows(true)}>
                                TV Shows
                            </a>
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

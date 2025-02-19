"use client";
import './styles.css';

export default function NavBar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark fixed-top custom-navbar custom-navbar-color">
            <div className="container-fluid custom-navbar-color mx-3">
                <a className="navbar-brand" href="#">Name</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse my-3" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="#">Movies</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">TV Shows</a>
                        </li>
                    </ul>
                    <form className="d-flex" role="search">
                        <input className="form-control me-3" type="search" placeholder="Search" aria-label="Search"/>
                        <button className="btn btn-outline-light" type="submit">Search</button>
                    </form>
                </div>
            </div>
        </nav>
    );
}

'use client'

import "@/app/components/Footer/styles.css"

export default function Footer() {
    return (
        <footer className="footer-container">
            <a className="github" href="https://github.com/rostikcheremys/movies-catalog"><i className="bi bi-github"></i> GitHub</a>
            <p className="developer">&copy; 2025 Rostyslav Cheremys</p>
        </footer>
    );
}

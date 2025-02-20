"use client";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "./components/styles.css";
import NavBar from "@/app/components/NavBar";

export default function DashboardLayout({ children }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className="custom-background-color" suppressHydrationWarning>
                <NavBar/>
                <main className="my-5">{children}</main>
            </body>
        </html>
    )
}

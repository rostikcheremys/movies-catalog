'use client'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './components/styles.css';
import './globals.css';

import NavBar from '@/app/components/NavBar';
import Footer from '@/app/components/Footer';

export default function DashboardLayout({ children }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body suppressHydrationWarning>
                <NavBar/>
                <main>{children}</main>
                <Footer/>
            </body>
        </html>
    )
}

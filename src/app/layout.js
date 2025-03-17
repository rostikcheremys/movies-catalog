'use client'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './globals.css';

import NavBar from '@/app/components/NavBar/NavBar';
import Footer from '@/app/components/Footer/Footer';

export default function DashboardLayout({ children }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body>
                <NavBar/>
                <main>{children}</main>
                <Footer/>
            </body>
        </html>
    )
}

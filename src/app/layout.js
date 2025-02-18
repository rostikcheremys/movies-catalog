import React from "react";
import "./globals.css";

export default function DashboardLayout({ children }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body suppressHydrationWarning>
                <main className="bg-red-500">{children}</main>
            </body>
        </html>
    )
}

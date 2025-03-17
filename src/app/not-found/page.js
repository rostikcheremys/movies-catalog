'use client';

import Image from "next/image";
import "@/app/not-found/styles.css"

export default function Page() {
    return (
        <div className="error-item">
            <Image src="/404.gif" alt="Not Found" className="not-found-gif" width={580} height={323}/>
            <h1>Not Found</h1>
        </div>
    );
}
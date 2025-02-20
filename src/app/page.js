"use client";

import React, {useState} from "react";
import Movie from "@/app/components/Movie";
import Card from "@/app/components/Card";
import Pagination from "@/app/components/Pagination";
import NavBar from "@/app/components/NavBar";

export default function Page() {
    const [isTvShows, setIsTvShows] = useState(false);
    return (
        <div>
            <NavBar setIsTvShows={setIsTvShows} />
            <Card isTvShows={isTvShows} />
        </div>
    );
}

"use client";

import React, {useState} from "react";
import Movie from "@/app/components/Movie";
import Cards from "@/app/components/Cards";
import Pagination from "@/app/components/Pagination";
import NavBar from "@/app/components/NavBar";
import "./components/styles.css";


export default function Page() {
    const [isTvShows, setIsTvShows] = useState(false);
    return (
        <div>
            <NavBar setIsTvShows={setIsTvShows} isTvShows={isTvShows} />
            <Cards isTvShows={isTvShows} />
        </div>
    );
}

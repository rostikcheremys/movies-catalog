"use client";

import React, { useEffect, useState } from "react";
import './styles.css';
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

export default function Card() {
    const [movieList, setMovieList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);


    const getCard = (page = 1) => {
        const apiKey = process.env.NEXT_PUBLIC_MOVIE_API_KEY;

        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=${page}`)
            .then(res => res.json())
            .then(json => {
                setMovieList(json.results);
                setTotalPages(json.total_pages);
            });
    };

    useEffect(() => {
        getCard(currentPage);
    }, [currentPage]);

    const generatePageNumbers = () => {
        let pages = [];

        if (totalPages <= 9) {
            pages = Array.from({ length: totalPages }, (_, i) => i + 1);
        } else {
            // Перші 9 сторінок
            pages = Array.from({ length: 9 }, (_, i) => i + 1);
            pages.push("...");

            if (currentPage > 5 && currentPage < totalPages - 4) {
                pages = [1, "...", currentPage - 3, currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2, currentPage + 3, "..."];
            }

            if (currentPage >= totalPages - 5) {
                pages = [1, "...", totalPages - 9, totalPages - 8, totalPages - 7, totalPages - 7, totalPages - 6, totalPages - 5, totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1];
            }

            pages.push(totalPages);
        }

        return pages;
    };

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div>
            <div className="row row-cols-1 row-cols-md-4 g-4 custom-mt-card mx-3">
                {movieList.map((movie) => (
                    <div key={movie.id} className="col">
                        <div className="card custom-card-body-color custom-rounded">
                            <img
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                className="card-img-top custom-rounded-img"
                                alt={movie.title}
                            />
                            <div className="card-body custom-card-body-color custom-rounded">
                                <h5 className="card-title text-white text-truncate d-block" style={{maxWidth: "100%"}}>
                                    {movie.title || 'No title available'}
                                </h5>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Пагінація */}
            <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center g-2">
                    <li className="page-item">
                        <a className="page-link" href="#" onClick={() => handlePageChange(currentPage - 1)} aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>
                    {generatePageNumbers().map((page, index) => (
                        <li key={index} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                            {page === "..." ? (
                                <span className="page-link">...</span>
                            ) : (
                                <a className="page-link" href="#" onClick={() => handlePageChange(page)}>
                                    {page}
                                </a>
                            )}
                        </li>
                    ))}
                    <li className="page-item">
                        <a className="page-link" href="#" onClick={() => handlePageChange(currentPage + 1)} aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

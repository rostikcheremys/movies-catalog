'use client'

export default function Pagination({totalPages, currentPage, setCurrentPage, fetch}) {
    const generatePageNumbers = () => {
        let pages = [];

        if (totalPages <= 6) {
            pages = Array.from({ length: totalPages }, (_, i) => i + 1);
        } else {
            pages = Array.from({ length: 6 }, (_, i) => i + 1);
            pages.push("...");

            if (currentPage > 3 && currentPage < totalPages - 3) {
                pages = [1, "...", currentPage - 1, currentPage, currentPage + 1, currentPage + 2, "..."];
            }

            if (currentPage >= totalPages - 3) {
                pages = [1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
            }
        }

        return pages;
    };

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            fetch(page);

            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center my-5">
                <li className="page-item">
                    <a className="page-link text-white" onClick={() => handlePageChange(currentPage - 1)}
                       aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
                    {generatePageNumbers().map((page, index) => (
                        <li key={index} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                            {page === "..." ? (
                                <span className="page-link text-white">...</span>
                            ) : (
                                <a className="page-link text-white" onClick={() => handlePageChange(page)}>
                                    {page}
                                </a>
                            )}
                        </li>
                    ))}
                <li className="page-item">
                    <a className="page-link text-white" onClick={() => handlePageChange(currentPage + 1)}
                       aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
            </ul>
        </nav>
    );
}
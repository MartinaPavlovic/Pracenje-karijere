import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./List.css";

export default function List() {
    const [currentPage, setCurrentPage] = useState(1);
    const employeesPerPage = 20;

    // Mock podaci za zaposlenike
    const employees = [
        { name: "Marko Marković", level: "Junior" },
        { name: "Ana Anić", level: "Mid" },
        { name: "Petar Petrović", level: "Senior" },
        { name: "Ivana Ivanković", level: "Expert" },
        { name: "Karla Karlić", level: "Junior" },
        { name: "Milan Milanović", level: "Mid" },
        { name: "Nina Ninović", level: "Senior" },
        { name: "Josip Josić", level: "Expert" },
        { name: "Luka Lukić", level: "Junior" },
        { name: "Mateo Matić", level: "Mid" },
        { name: "Ema Emić", level: "Senior" },
        { name: "Tina Tinić", level: "Expert" },
        { name: "Marko Marković", level: "Junior" },
        { name: "Ana Anić", level: "Mid" },
        { name: "Petar Petrović", level: "Senior" },
        { name: "Ivana Ivanković", level: "Expert" },
        { name: "Karla Karlić", level: "Junior" },
        { name: "Milan Milanović", level: "Mid" },
        { name: "Nina Ninović", level: "Senior" },
        { name: "Josip Josić", level: "Expert" },
        { name: "Luka Lukić", level: "Junior" },
        { name: "Mateo Matić", level: "Mid" },
        { name: "Ema Emić", level: "Senior" },
        { name: "Tina Tinić", level: "Expert" },
    ];

    const totalPages = Math.ceil(employees.length / employeesPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const currentEmployees = employees.slice(
        (currentPage - 1) * employeesPerPage,
        currentPage * employeesPerPage
    );

    const getPagination = () => {
        const pages = [];
        const ellipsis = "...";

        // Always include the first page
        pages.push(1);

        // Add ellipsis before current page range, if needed
        if (currentPage > 3) {
            pages.push(ellipsis);
        }

        // Add current, previous, and next pages
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
            if (i > 1 && i < totalPages) {
                pages.push(i);
            }
        }

        // Add ellipsis after current page range, if needed
        if (currentPage < totalPages - 2) {
            pages.push(ellipsis);
        }

        // Always include the last page
        if (totalPages > 1) {
            pages.push(totalPages);
        }

        return pages;
    };

    const pagination = getPagination();

    return (
        <div className="list-container">
            <div className="employee-list">
                {currentEmployees.map((employee, index) => (
                    <div
                        key={index}
                        className={`employee-box ${
                            index % 2 === 0 ? "even" : "odd"
                        }`}
                    >
                     <Link to="/employee"><span className="employee-name">{employee.name}</span> </Link>
                        <span className="employee-level">{employee.level}</span>
                    </div>
                ))}
            </div>

            {/* Navigacija po stranicama */}
            <div className="pagination">
                {pagination.map((page, index) =>
                    page === "..." ? (
                        <span key={index} className="ellipsis">
                            {page}
                        </span>
                    ) : (
                        <button
                            key={index}
                            onClick={() => handlePageChange(page)}
                            className={`page-button ${
                                currentPage === page ? "active" : ""
                            }`}
                        >
                            {page}
                        </button>
                    )
                )}
            </div>
        </div>
    );
}

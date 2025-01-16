import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./List.css";
import axios from "axios";

export default class EvaluationList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      employeesPerPage: 20,
      employees: [], // Inicijalno prazan popis zaposlenika
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    axios
      .get("/api/korisnik")
      .then((res) => {
        const employees = res.data;
        this.setState({ employees });
        console.log(this.state.employees);
      })
      .catch((err) => {
        console.error("Error fetching employees:", err);
      });
  }

  handleClick(id) {
    localStorage.setItem("id", id);
  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  getPagination = () => {
    const { currentPage, employees, employeesPerPage } = this.state;
    const totalPages = Math.ceil(employees.length / employeesPerPage);
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

  render() {
    const { currentPage, employees, employeesPerPage } = this.state;
    const currentEmployees = employees.slice(
      (currentPage - 1) * employeesPerPage,
      currentPage * employeesPerPage
    );

    const pagination = this.getPagination();

    return (
      <div className="list-container" style={{ top: "25%", left:"10vw" }}>
        <div className="employee-list">
          {currentEmployees.map((employee, index) => (
            <div
              key={index}
              className={`employee-box ${index % 2 === 0 ? "even" : "odd"}`}
            >
              <Link to="/evaluation" onClick={() => this.handleClick(employee.id)}>
                <span className="employee-name">{employee.ime} {employee.prezime}</span>
              </Link>
              <span className="employee-level">{employee.ime}</span>
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
                onClick={() => this.handlePageChange(page)}
                className={`page-button ${currentPage === page ? "active" : ""}`}
              >
                {page}
              </button>
            )
          )}
        </div>
      </div>
    );
  }
}

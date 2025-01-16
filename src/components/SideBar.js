import React, { Component } from "react";
import './SideBar.css';
import { Link } from "react-router-dom";
import { FaAnglesRight, FaAnglesLeft } from "react-icons/fa6";
import axios from "axios";

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSidebarOpen: false,
      subjects: [], // Početno prazno polje za odjele
    };
  }

  // Dohvaćanje odjela nakon što se komponenta učita
  componentDidMount() {
    axios
      .get(`/api/odjel`)
      .then((res) => {
        console.log("API Response (subjects):", res.data);
        this.setState({ subjects: res.data }); // Spremanje odjela u state
      })
      .catch((err) => {
        console.error("Error fetching subjects:", err);
      });
  }

  handleClick(id) {
    localStorage.setItem("odjelId", id);
  }

  // Funkcija za prebacivanje statusa sidebar-a
  toggleSidebar = () => {
    this.setState((prevState) => ({
      isSidebarOpen: !prevState.isSidebarOpen,
    }));
  };

  render() {
    const { isSidebarOpen, subjects } = this.state;

    return (
      <div className={`bar ${isSidebarOpen ? "barOpen" : ""}`}>
        <button className="barToggle" onClick={this.toggleSidebar}>
          {isSidebarOpen ? (
            <FaAnglesLeft className="barIcon" />
          ) : (
            <FaAnglesRight className="barIcon" />
          )}
        </button>
        {isSidebarOpen && (
          <div className="sidebarContent">
            <input
              type="text"
              placeholder="Pretraži..."
              className="searchBar"
            />
            <nav className="sidebarLinks">
              {subjects.length > 0 ? (
                subjects.map((subject) => (
                  <Link
                    to={`/subject`} // Pretpostavka da svaki odjel ima svoj ID
                    className="sidebarLink"
                    key={subject.id}
                    onClick={() => this.handleClick(subject.id)}
                  >
                    {subject.naziv} {/* Pretpostavka da svaki odjel ima 'name' */}
                  </Link>
                ))
              ) : (
                <p>Nema dostupnih odjela</p>
              )}
            </nav>
          </div>
        )}
      </div>
    );
  }
}

export default SideBar;

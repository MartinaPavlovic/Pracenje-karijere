import React, { useState } from "react";
import './SideBar.css';
import { Link } from "react-router-dom";
import { FaAnglesRight, FaAnglesLeft } from "react-icons/fa6";

export default function SideBar() {

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen((prev) => !prev);
    }

    return (
        <div className={`bar ${isSidebarOpen ? "barOpen" : ""}`}>
            <button className="barToggle" onClick={toggleSidebar}>
                {isSidebarOpen ? <FaAnglesLeft className="barIcon" /> : <FaAnglesRight className="barIcon" />}
            </button>
            {isSidebarOpen && (
                <div className="sidebarContent">
                <input 
                    type="text" 
                    placeholder="Pretraži..." 
                    className="searchBar" 
                />
                
                <nav className="sidebarLinks">
                    <Link to="/subject" className="sidebarLink">Programiranje</Link>
                    <Link to="/subject" className="sidebarLink">Analiza</Link>
                    <Link to="/subject" className="sidebarLink">Statistika</Link>
                </nav>
            </div>
            )}
        </div>
    )
}
import React, { useState } from "react";
import './Header2.css';
import { Link } from "react-router-dom";

export default function Header2() {

   const [uloga, setUloga] = useState("voditelj");


    return (
        <div className="header2">
            {uloga === "zaposlenik" ? (
                <div className="linksContainer">
                    <Link to="/ocjenjivanje" className="links">Ocjenjivanje</Link>
                </div>
            ) :
            (
                <div className="linksContainer">
                    <Link to="/ocjenjivanje" className="links">Ocjenjivanje</Link>
                    <Link to="/listOfEmployees" className="links">Popis zaposlenika</Link>
                </div>
            )}            
        </div>
    )
}
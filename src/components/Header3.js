import { React, useState } from "react";
import { Link } from "react-router-dom";
import './Header2.css';

export default function Header3() {

    const [uloga, setUloga] = useState("voditelj");

    return (
        <div className="header2">
            {uloga === "zaposlenik" ? (
                <div className="linksContainer">
                    <Link to="/ocjenjivanje" className="links">Uredi profil</Link>
                </div>
            ) :
            (
                <div className="linksContainer">
                    <Link to="/editProfile" className="links">Uredi profil</Link>
                    <Link to="/listOfEmployees" className="links">Odaberi željeni karijerni put</Link>
                </div>
            )}      
        </div>
    )
}
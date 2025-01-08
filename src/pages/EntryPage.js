import React from "react";
import { Link } from "react-router-dom";
import EntryImage from '../images/EntryImage.png';
import './EntryPage.css';

export default function Home() {
    return (
        <div>
            <img className="entryImage" src={EntryImage} />
            <Link to="/home" className="loginButton">Login</Link>
        </div>
    )
}
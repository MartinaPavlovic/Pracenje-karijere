import React from "react";
import LogoImage from '../images/EntryImage.png';
import { BsPersonCircle } from "react-icons/bs";
import { MdOutlineEmail } from "react-icons/md";
import './Header.css';

export default function Header() {
    return (
        <div className="header">
            <img className="logoImage" src={LogoImage} />
            <MdOutlineEmail className="emailLogo" />
            <div className="notificationBadge">1</div>
            <BsPersonCircle className="personCircle" />
            <p className="profileText">Moj profil</p>
        </div>
    )
}
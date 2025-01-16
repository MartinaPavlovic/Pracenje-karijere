import React, { Component } from "react";
import LogoImage from '../images/EntryImage.png';
import { BsPersonCircle } from "react-icons/bs";
import { MdOutlineEmail } from "react-icons/md";
import './Header.css';
import { Link } from "react-router-dom";
import axios from "axios";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employees: [], // Inicijalno prazan popis zaposlenika
        };
        this.voditeljId = 3; // ID voditelja
    }

    componentDidMount() {
        // Dodavanje voditeljId kao query parametar
        axios
            .get("/api/korisnik/fetch-team-members-with-pending-ocjena", {
                params: {
                    korisnikId: this.voditeljId, // Prosljeđivanje voditeljId
                },
            })
            .then((res) => {
                console.log("API Response (employees):", res.data);
                this.setState({ employees: res.data });
            })
            .catch((err) => {
                console.error("Error fetching employees:", err);
            });
    }

    render() {
        const { employees } = this.state;
        const employeeCount = employees.length;

        return (
            <div className="header">
                <img className="logoImage" src={LogoImage} alt="Logo" />
                <Link to="/requestList">
                    <MdOutlineEmail className="emailLogo" />
                </Link>
                {employeeCount > 0 && (
                    <div className="notificationBadge">{employeeCount}</div>
                )}
                <BsPersonCircle className="personCircle" />
                <p className="profileText">Moj profil</p>
            </div>
        );
    }
}

export default Header;

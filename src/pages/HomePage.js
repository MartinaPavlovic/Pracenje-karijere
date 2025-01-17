import React from "react";
import '../components/Header';
import '../components/Header2';
import Header from "../components/Header";
import Header2 from "../components/Header2";
import SideBar from "../components/SideBar";
import CommentsList from "../components/CommentsList";
import './HomePage.css';
import keycloakService from '../keycloak';

export default function HomePage() {

    const handleLogout = () => {
          keycloakService.logout();
    };

    return (
        <div>
            <Header />
            <Header2 />
            <div className="homepageContainer">
                <SideBar />
                <CommentsList />
                <button onClick={handleLogout}>
                Logout
                </button>
            </div>
        </div>
    );
}

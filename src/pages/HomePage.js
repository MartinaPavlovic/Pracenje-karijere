import React from "react";
import '../components/Header';
import '../components/Header2';
import Header from "../components/Header";
import Header2 from "../components/Header2";
import SideBar from "../components/SideBar";

export default function HomePage() {
    return (
        <div>
            <Header />
            <Header2 />
            <SideBar />
        </div>
    )
}
import React from "react";
import Header from "../components/Header";
import Header2 from "../components/Header2";
import SideBox from "../components/SideBox";
import List from "../components/List";

export default function ListOfEmployees() {
    return(
        <div>
            <Header />
            <Header2 />
            <SideBox />
            <List />
        </div>
    )
}
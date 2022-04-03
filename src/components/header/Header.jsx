import React from "react";
import "./Header.css"
import logo from "../source/rainbow.png";

function Header() {
    return (
        <div className="container1">
            <div className="logo">
                <img src={logo} height="40px" alt="logo" />
            </div>
        </div>
    );
}

export default Header;
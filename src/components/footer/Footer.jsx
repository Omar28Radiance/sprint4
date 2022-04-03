import React from "react";
import "./Footer.css";

const Footer = () => {
    return (
        <div className="footer">
            <div className="container">
                <hr />
                <div className="row">
                    <p className="col-sm">
                        &copy;{new Date().getFullYear()} GLOBANT ACAMICA INC | All right reserved | Terms of Service | Privacy
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Footer;
import React from "react";
import { Link } from "react-router-dom";

import "./Navbar.css";

const Navbar = () => {


    return(
        <nav className="navbar">
            <div className="navbar-links">
                <ul>
                    <li><a><Link to="/">Home</Link></a></li>
                    <li><a><Link to="/countries">Countries</Link></a></li>
                    <li><a><Link to="/country/activity">Add Tourist Activity</Link></a></li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar
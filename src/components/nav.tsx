import React from "react";
import { Link } from 'react-router-dom';
import "../css/nav.css"


function NavigationBar() {
    return (
        <div className="navDiv">
            <nav className="nav">
                <Link className="navLink" to="/employees">Employees</Link>
                <Link className="navLink" to="/tasks">Tasks</Link>
            </nav>
        </div>
    );
    }

export default NavigationBar
import React from "react";
import { NavLink } from "react-router-dom";
import '../styles/components/navigation.css';

const Navigation = () => {
    return (
    <div className="nav">
        <ul className="nav-list">
            <NavLink to="/">
            <li>Home</li> 
            </NavLink>
            <NavLink to="/bars">
            <li>Bars</li>
            </NavLink>
            <NavLink to="/bieres">
            <li>Bières</li>
            </NavLink>
            <NavLink to="/orders">
            <li>Commandes</li> 
            </NavLink>
        </ul>
    </div>
    )
};

export default Navigation;

import React from 'react';
import {NavLink} from "react-router-dom";

const NavHead = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                        <span className="navbar-brand ms-5">
                            <NavLink className="nav-link" to="/">
                                Calories Tracker
                            </NavLink>
                        </span>
                    <span>
                            <NavLink to="/new-meal" className="btn btn-primary me-5">Add meal</NavLink>
                        </span>
                </div>
            </nav>
        </div>
    );
};

export default NavHead;
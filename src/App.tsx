import React from 'react';
import {NavLink, Route, Routes} from "react-router-dom";
import './App.css';
import AddForm from "./containerAddAndEdit/AddForm/AddForm";
import EditForm from "./containerAddAndEdit/EditForm/EditForm";
import Get from "./containerGet/Get/Get";

const App = () => {

    return (
        <>
            <header>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="container-fluid">
                        <span className="navbar-brand ms-5">
                            <NavLink className="nav-link" to="/">
                                Calories Tracker
                            </NavLink>
                        </span>
                    </div>
                </nav>
            </header>
            <main className="container-fluid">
                <NavLink to="/new-meal" className="btn btn-primary">Add meal</NavLink>
                <Routes>
                    <Route path="/" element={(
                        <Get />
                    )}/>
                    <Route path="/new-meal" element={(
                        <AddForm />
                    )}/>
                    <Route path="/meals/:id/edit" element={(
                        <EditForm />
                    )}/>
                </Routes>
            </main>
        </>
    )
};

export default App;

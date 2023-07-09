import React from 'react';
import {Route, Routes} from "react-router-dom";
import AddForm from "./containerAddAndEdit/AddForm/AddForm";
import EditForm from "./containerAddAndEdit/EditForm/EditForm";
import Get from "./containerGet/Get/Get";
import NavHead from "./components/NavHead/NavHead";
import './App.css';

const App = () => {

    return (
        <>
            <header>
                <NavHead />
            </header>
            <main className="container-fluid">
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

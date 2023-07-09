import React from 'react';
import {NavLink, Route, Routes} from "react-router-dom";
import './App.css';
import AddForm from "./containers/AddForm/AddForm";

const App = () => {

  return (
      <>
         <main className="container-fluid">
             <NavLink to="/new-meal">Add meal</NavLink>
             <Routes>
                 <Route path="/new-meal" element={(
                     <AddForm />
                 )} />
             </Routes>
         </main>
      </>
  )
};

export default App;

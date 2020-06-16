import React from 'react';
import './Domino.css';
import { BrowserRouter as Router } from 'react-router-dom';
import ApplicationViews from './components/ApplicationViews';
import NavBar from './components/nav/Nav';

function Domino() {
  return (
    <>
    <Router>
      <NavBar />
      <ApplicationViews />
    </Router>
    </>
  );
}

export default Domino;

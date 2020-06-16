import React from "react";
import "./Nav.css";
import { withRouter, Link } from "react-router-dom";
import useSimpleAuth from "../auth/useSimpleAuth";

const NavBar = (props) => {
  const { isAuthenticated, logout } = useSimpleAuth();

  return (
    <div id="navDiv">
        <nav>
            <Link to="/">Home</Link>
            {isAuthenticated() ? (
            <>
            <Link to="/">Add Task</Link>
            <Link to="/">Lists</Link>
            <Link to="/">Settings</Link>
            <Link onClick={() => {logout();}} to="/">Log Out</Link>
            </>
            ) : (
            <>
            <Link to="/login">Log In</Link>
            <Link to="/register">Register</Link>
            </>
            )}
        </nav>
    </div>
  );
};

export default withRouter(NavBar);
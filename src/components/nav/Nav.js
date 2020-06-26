import React from "react";
import "./Nav.css";
import { withRouter, Link } from "react-router-dom";
import useSimpleAuth from "../auth/useSimpleAuth";

const NavBar = (props) => {
  const { isAuthenticated, logout } = useSimpleAuth();

  return (
    <div id="navDiv">
        <nav>
            <div className="link-container">
            <Link className="link" to="/"><h3>HOME</h3></Link>
            </div>
            {isAuthenticated() ? (
            <>
            <div className="link-container">
            <Link className="link" to="/addtask"><h3>ADD TASK</h3></Link>
            </div>
            <div className="link-container">
            <Link className="link" to="/lists"><h3>LISTS</h3></Link>
            </div>
            <div className="link-container">
            <Link to="/"><h3>SETTINGS</h3></Link>
            </div>
            <div className="link-container">
            <Link onClick={() => {logout()}} to="/"><h3>LOG OUT</h3></Link>
            </div>
            </>
            ) : (
            <>
            <div className="link-container">
            <Link to="/login"><h3>LOG IN</h3></Link>
            </div>
            <div className="link-container">
            <Link to="/register"><h3>REGISTER</h3></Link>
            </div>
            </>
            )}
        </nav>
    </div>
  );
};

export default withRouter(NavBar);
import React, { useState, useEffect } from "react";
import "./Nav.css";
import { withRouter, Link } from "react-router-dom";
import useSimpleAuth from "../auth/useSimpleAuth";
import { Accordion, Icon } from 'semantic-ui-react'
import List from '../list/List'

const NavBar = (props) => {
  const { isAuthenticated, logout } = useSimpleAuth();
  const [active, setActive] = useState(false)

  const flipActive = () => {
    if(active === false) {
      setActive(true)
    } else if (active === true) {
      setActive(false)
    }
  }

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
            <div className="accordion-links">
            <Accordion>
              <Accordion.Title
                active={active}
                onClick={flipActive}            
                >            
                <h3 className="link">LISTS <Icon name='dropdown' /></h3>
              </Accordion.Title>
              <Accordion.Content active={active} >            
                <List { ...props }/>
              </Accordion.Content>
            </Accordion>
            </div>
            <div className="link-container">
            <Link className="link" to="/"><h3>SETTINGS</h3></Link>
            </div>
            <div className="link-container">
            <Link className="link" onClick={() => {logout()}} to="/"><h3>LOG OUT</h3></Link>
            </div>
            </>
            ) : (
            <>
            <div className="link-container">
            <Link className="link" to="/login"><h3>LOG IN</h3></Link>
            </div>
            <div className="link-container">
            <Link className="link" to="/register"><h3>REGISTER</h3></Link>
            </div>
            </>
            )}
        </nav>
    </div>
  );
};

export default withRouter(NavBar);
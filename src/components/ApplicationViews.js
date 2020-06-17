import React from "react";
import { Route, Redirect } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
import useSimpleAuth from "./auth/useSimpleAuth";
import List from "./list/List";

const ApplicationViews = (props) => {
    const { isAuthenticated } = useSimpleAuth()

    return (
        <>
        <Route path="/login" render={(props) => {
            return <Login { ...props } />
        }}/>
        <Route path="/register" render={(props) => {
            return <Register { ...props } />
        }}/>
        <Route path="/list" render={(props) => {
            return <List { ...props } />
        }}/>
        </>
    )
};

export default ApplicationViews;
import React from "react";
import { Route } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
// import useSimpleAuth from "./auth/useSimpleAuth";
import ListDetail from "./list/ListDetail";
import List from "./list/List";

const ApplicationViews = (props) => {
    // const { isAuthenticated } = useSimpleAuth()

    return (
        <>
        <Route path="/login" render={(props) => {
            return <Login { ...props } />
        }}/>
        <Route path="/register" render={(props) => {
            return <Register { ...props } />
        }}/>
        <Route path="/list/:listId(\d+)" render={(props) => {
            return <ListDetail listId={parseInt(props.match.params.listId)} { ...props } />
        }}/>
        <Route path="/lists" render={(props) => {
            return <List { ...props } />
        }}/>
        </>
    )
};

export default ApplicationViews;
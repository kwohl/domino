import React from "react";
import { Route } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
// import useSimpleAuth from "./auth/useSimpleAuth";
import ListDetail from "./list/ListDetail";
import List from "./list/List";
import TaskForm from "./task/TaskForm";
import TaskDetail from "./task/TaskDetail";

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
        <Route path="/addtask" render={(props) => {
            return <TaskForm { ...props } />
        }}/>
        <Route path="/task/:taskId(\d+)" render={(props) => {
            return <TaskDetail taskId={parseInt(props.match.params.taskId)} { ...props } />
        }}/>
        </>
    )
};

export default ApplicationViews;
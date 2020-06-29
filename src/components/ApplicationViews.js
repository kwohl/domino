import React from "react";
import { Route } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
import ListDetail from "./list/ListDetail";
import TaskForm from "./task/TaskForm";
import TaskDetail from "./task/TaskDetail";
import StepEditForm from "./step/StepEdit";
import Home from "./home/Home";
import Settings from "./settings/Settings";

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
        <Route path="/addtask" render={(props) => {
            return <TaskForm { ...props } />
        }}/>
        <Route path="/task/:taskId(\d+)" render={(props) => {
            return <TaskDetail taskId={parseInt(props.match.params.taskId)} { ...props } />
        }}/>
        <Route path="/step/:stepId(\d+)" render={(props) => {
            return <StepEditForm stepId={parseInt(props.match.params.stepId)} { ...props } />
        }}/>
        <Route exact path="/" render={(props) => {
            return <Home { ...props }/>
        }}/>
        <Route path="/settings" render={(props) => {
            return <Settings { ...props }/>
        }}/>
        </>
    )
};

export default ApplicationViews;
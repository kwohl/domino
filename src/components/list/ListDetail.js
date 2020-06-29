import React, { useState, useEffect } from "react";
import ListManager from "../../modules/ListManager";
import TaskManager from "../../modules/TaskManager";
import TaskCard from "../task/TaskCard";
import StepManager from "../../modules/StepManager";
import { Progress } from 'semantic-ui-react'

const ListDetail = (props) => {
    const [list, setList] = useState({ name: "", description: "" })
    const [tasks, setTasks] = useState([])
    const [finishedTasks, setFinishedTasks] = useState([])

    const getList = () => {
      ListManager.getList(props.listId)
        .then(response => {
          setList(response);
        })
    };

    const getTasks = () => {
      const completeTasks = []
      const incompleteTasks = []

      TaskManager.getTasksByList(props.listId)
        .then(response => {
          response.forEach(task => {
            if (task.is_complete === false) {
              incompleteTasks.push(task)
              console.log("task not complete: ", task.name)
            } else {
              completeTasks.push(task)
            }
          })
          setTasks(incompleteTasks)
          setFinishedTasks(completeTasks)
        })
    };

    const deleteTask = (taskId) => {
        if (window.confirm("Would you like to remove this task from your list?")) {
            TaskManager.deleteTask(taskId)
                .then(getTasks)
        }
    }

    const deleteStep = (stepId) => {
      if (window.confirm("Would you like to remove this step?")) {
        StepManager.deleteStep(stepId)
          .then(getTasks)
      }
    }

    const completeStep = (stepId) => {
      const stepObj = { "is_complete": true}
      StepManager.completeStep(stepObj, stepId)
        .then(getTasks)
    }

    const undoCompleteStep = (stepId) => {
      const stepObj = { "is_complete": false}
      StepManager.completeStep(stepObj, stepId)
        .then(getTasks)
    }


    useEffect(() => {
      getList()
      getTasks()
    }, [props.listId])
    
    return (
      <div className="pageContent">
        <h1 className="page-header">{list.name}</h1>
        {/* <p className="white">{list.description}</p> */}
        <div className="boards">
        <div className="kanban">
          <p className="kanbanTitle"><strong><span className="accent">To Do</span></strong></p>
          
          <div className="board-content">
            {tasks.map(task => (
              
              <TaskCard
                key={task.id}
                task={task}
                listId={list.id}
                deleteStep={deleteStep}
                deleteTask={deleteTask}
                completeStep={completeStep}
                undoCompleteStep={undoCompleteStep}
                getTasks={getTasks}
                getList={getList}
                {...props}
              />
            ))}
          </div>
          
        </div>
        <div className="kanban">
          <p className="kanbanTitle"><strong><span className="accent">Complete</span></strong></p>

          <div className="board-content">
            {finishedTasks.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                listId={list.id}
                deleteStep={deleteStep}
                deleteTask={deleteTask}
                completeStep={completeStep}
                undoCompleteStep={undoCompleteStep}
                getTasks={getTasks}
                getList={getList}
                {...props}
              />
            ))}
          </div>

        </div>
        </div>
      </div>
    );
  };
  
  export default ListDetail;

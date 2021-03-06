import React, { useState, useEffect } from "react";
import ListManager from "../../modules/ListManager";
import TaskManager from "../../modules/TaskManager";
import TaskCard from "../task/TaskCard";
import StepManager from "../../modules/StepManager";
import TaskStepManager from "../../modules/TaskStepManager";

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

    const deleteStep = (taskStepId) => {
      if (window.confirm("Would you like to remove this step?")) {
        TaskStepManager.deleteTaskStep(taskStepId)
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
      <>
      <div className="pageTools">
        <h1 className="page-header">{list.name}</h1>
      </div>
      
      <div className="pageContent">
        <div className="boards">
        <div className="kanban">
          <p className="kanbanTitle"><strong><span className="opacity">TO DO</span></strong></p>
          
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
          <p className="kanbanTitle"><strong><span className="opacity">COMPLETE</span></strong></p>

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
      </>
    );
  };
  
  export default ListDetail;

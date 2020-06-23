import React, { useState, useEffect } from "react";
import ListManager from "../../modules/ListManager";
import TaskManager from "../../modules/TaskManager";
import TaskCard from "../task/TaskCard";
import StepManager from "../../modules/StepManager";

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
          response.map(task => {
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


    useEffect(() => {
      getList()
      getTasks()
    }, [])
    
    return (
      <div className="pageContent">
        <h3>{list.name}</h3>
        <p><strong>{list.description}</strong></p>
        <div className="flexRow">
        <div className="kanban">
          <div>
            {tasks.map(task => (
              
              <TaskCard
                key={task.id}
                task={task}
                listId={list.id}
                deleteStep={deleteStep}
                deleteTask={deleteTask}
                completeStep={completeStep}
                getTasks={getTasks}
                {...props}
              />
            ))}
          </div>
        </div>
        <div className="kanban">
          <div>
            {finishedTasks.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                listId={list.id}
                deleteStep={deleteStep}
                deleteTask={deleteTask}
                completeStep={completeStep}
                {...props}
              />
            ))}
          </div>
        </div>
        </div>
        <div>
          <button onClick={() => props.history.push("/addtask")}>Add New Task</button>
        </div>
      </div>
    );
  };
  
  export default ListDetail;

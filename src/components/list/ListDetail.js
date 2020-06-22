import React, { useState, useEffect } from "react";
import ListManager from "../../modules/ListManager";
import TaskManager from "../../modules/TaskManager";
import TaskCard from "../task/TaskCard";
import StepManager from "../../modules/StepManager";

const ListDetail = (props) => {
    const [list, setList] = useState({ name: "", description: "" })
    const [tasks, setTasks] = useState([])


    const getList = () => {
      ListManager.getList(props.listId)
        .then(response => {
          setList(response);
        })
    };

    const getTasks = () => {
      TaskManager.getTasksByList(props.listId)
        .then(response => {
          setTasks(response);
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
          <div>
            {tasks.map(task => (
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
          <div>
              <button onClick={() => props.history.push("/addtask")}>Add New Task</button>
          </div>
      </div>
    );
  };
  
  export default ListDetail;

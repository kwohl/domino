import React, { useState, useEffect } from "react";
import TaskStepManager from "../../modules/TaskStepManager";

const TaskCard = (props) => {
    const [steps, setSteps] = useState([])
    const quantity = steps.length

    useEffect(() => {
        TaskStepManager.getTaskStepsByTask(props.task.id)
            .then(response => setSteps(response))
        }, [])
    
    if (steps.length != 0) {
        return (
            <div className="taskCard">  
            <p>{props.task.name}</p>
            <p>{props.task.discription}</p>
            <p>There are {quantity} steps in this task</p>
            <ul>
                {steps.map(step => (
                    <li>{step.step.name}</li>
                ))}
            </ul>
            <button onClick={() => props.deleteTask(props.task.id)}>Delete</button>
            <button onClick={() => props.history.push(`/task/${props.task.id}`)}>Edit</button>
            </div>
        );
    } else {
        return (
            <div>  
            <p>{props.task.name}</p>
            <p>{props.task.discription}</p>
            <button onClick={() => props.deleteTask(props.task.id)}>Delete</button>
            <button onClick={() => props.history.push(`/task/${props.task.id}`)}>Edit</button>
            </div>
        );
    }

  };
  
  export default TaskCard;
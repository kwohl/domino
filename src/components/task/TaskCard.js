import React, { useState, useEffect } from "react";
import TaskStepManager from "../../modules/TaskStepManager";
import StepManager from "../../modules/StepManager";

const TaskCard = (props) => {
    const [taskSteps, setTaskSteps] = useState([])
    const quantity = taskSteps.length


    useEffect(() => {
        TaskStepManager.getTaskStepsByTask(props.task.id)
            .then(response => setTaskSteps(response))
        }, [props.task])


    
    
    
    if (taskSteps.length != 0) {
        return (
            <div className="taskCard">  
            <p><strong>{props.task.name}</strong></p>
            <p>{props.task.discription}</p>
            <p>There are {quantity} steps in this task</p>
            <ul>
                {taskSteps.map(taskStep => (
                    <div key={taskStep.id}>
                    <li>
                        {taskStep.step.name}
                        <span style={{ display: taskStep.step.is_complete ? "" : "none" }}>: Complete!</span> 
                    </li>
                    <button onClick={() => props.completeStep(parseInt(taskStep.step.url.split("/")[4]))}>Complete</button>
                    <button onClick={() => props.deleteStep(taskStep.step.url.split("/")[4])}>delete step</button>
                    <button onClick={() => props.history.push(`/step/${taskStep.step.url.split("/")[4]}`)}>Edit</button>
                    </div>
                ))}
            </ul>
            <button onClick={() => props.history.push(`/addstep/${props.task.id}`)}>Add Steps</button>
            <button onClick={() => props.deleteTask(props.task.id)}>Delete</button>
            <button onClick={() => props.history.push(`/task/${props.task.id}`)}>Edit</button>
            </div>
        );
    } else {
        return (
            <div className="taskCard">  
            <p><strong>{props.task.name}</strong></p>
            <p>{props.task.discription}</p>
            <button onClick={() => props.history.push(`/addstep/${props.task.id}`)}>Add Steps</button>
            <button onClick={() => props.deleteTask(props.task.id)}>Delete</button>
            <button onClick={() => props.history.push(`/task/${props.task.id}`)}>Edit</button>
            </div>
        );
    }

  };
  
  export default TaskCard;
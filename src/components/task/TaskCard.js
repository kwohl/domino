import React, { useState, useEffect } from "react";
import TaskStepManager from "../../modules/TaskStepManager";
import TaskManager from "../../modules/TaskManager";
// import StepManager from "../../modules/StepManager";
// import { Redirect } from "react-router-dom";

const TaskCard = (props) => {
    const [taskSteps, setTaskSteps] = useState([])
    const quantity = taskSteps.length

    const completeTask = (taskId) => {
        const taskObj = { "is_complete": true }
        TaskManager.completeTask(taskObj, taskId)
            .then(() => {
                taskSteps.forEach(taskStep => {
                    props.completeStep(parseInt(taskStep.step.url.split("/")[4]))
                })
            }).then(props.getTasks)
      }

    useEffect(() => {
        TaskStepManager.getTaskStepsByTask(props.task.id)
            .then(response => setTaskSteps(response))
        }, [props.task])

    
    if (taskSteps.length !== 0) {
        return (
            <div className="taskCard">  
            <p><strong>{props.task.name}</strong><span style={{ display: props.task.is_complete ? "" : "none" }}>- Complete!</span></p>
            <p>{props.task.discription}</p>
            <p>There are {quantity} steps in this task</p>
            <ul>
                {taskSteps.map(taskStep => (
                    <div key={taskStep.id}>
                    <li>
                        {taskStep.step.name}
                        <span style={{ display: taskStep.step.is_complete ? "" : "none" }}>: Complete!</span> 
                    </li>
                    <button onClick={() => props.completeStep(parseInt(taskStep.step.url.split("/")[4]))} style={{ display: taskStep.step.is_complete ? "none" : "" }}>Complete</button>
                    <button onClick={() => props.deleteStep(taskStep.step.url.split("/")[4]) } style={{ display: taskStep.step.is_complete ? "none" : "" }}>Delete Step</button>
                    <button onClick={() => props.history.push(`/step/${taskStep.step.url.split("/")[4]}`)}>Edit</button>
                    </div>
                ))}
            </ul>
            <button onClick={() => props.history.push(`/addstep/${props.task.id}`)} style={{ display: props.task.is_complete ? "none" : "" }}>Add Steps</button>
            <button onClick={() => props.deleteTask(props.task.id)}>Delete</button>
            <button onClick={() => props.history.push(`/task/${props.task.id}`)}>Edit</button>
            <button onClick={() => completeTask(props.task.id)} style={{ display: props.task.is_complete ? "none" : "" }}>Complete Task</button>
            </div>
        );
    } else {
        return (
            <div className="taskCard">  
            <p><strong>{props.task.name}</strong><span style={{ display: props.task.is_complete ? "" : "none" }}>- Complete!</span></p>
            <p>{props.task.discription}</p>
            <button onClick={() => props.history.push(`/addstep/${props.task.id}`)} style={{ display: props.task.is_complete ? "none" : "" }}>Add Steps</button>
            <button onClick={() => props.deleteTask(props.task.id)}>Delete</button>
            <button onClick={() => props.history.push(`/task/${props.task.id}`)}>Edit</button>
            <button onClick={() => completeTask(props.task.id)} style={{ display: props.task.is_complete ? "none" : "" }}>Complete Task</button>
            </div>
        );
    }

  };
  
  export default TaskCard;
import React, { useState, useEffect } from "react";
import TaskStepManager from "../../modules/TaskStepManager";
import TaskManager from "../../modules/TaskManager";
import { Icon, Card, Progress } from 'semantic-ui-react'

// import StepManager from "../../modules/StepManager";
// import { Redirect } from "react-router-dom";

const TaskCard = (props) => {
    const [taskSteps, setTaskSteps] = useState([])
    const quantity = taskSteps.length
    const [complete, setComplete] = useState(0)


    // const completeCount = () => {
    //     let count = 0
    //     taskSteps.forEach(step => {
    //         if (step.is_complete === true) {
    //             count = count + 1
    //         }
    //     })
    //     setComplete(count)
    // }

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
            .then(response => {
                setTaskSteps(response)
                let count = 0
                response.forEach(step => {
                    if(step.step.is_complete === true) {
                        count = count +1
                    }
                    setComplete(count)
                })
            })
 
    
        }, [props.task])

    
    if (taskSteps.length !== 0) {
        return (
            <Card className="taskCard">  
            <Card.Content>
            <Card.Header>
                {props.task.name}
                <Icon 
                name="square outline" 
                onClick={() => completeTask(props.task.id)} 
                style={{ display: props.task.is_complete ? "none" : "" }}>                    
                </Icon>
                <Icon name="check square outline" style={{ display: props.task.is_complete ? "" : "none" }} />
            </Card.Header>
            <Card.Meta>    
            <p>{props.task.discription}</p>
            <p>There are {quantity} steps in this task</p>
            </Card.Meta>
            </Card.Content>
            <Card.Content>
            <ul>
                {taskSteps.map(taskStep => (
                    <div key={taskStep.id}>
                      <li>
                        <Icon 
                            name="square outline"
                            title="Complete Step" 
                            onClick={() => props.completeStep(parseInt(taskStep.step.url.split("/")[4]))} 
                            style={{ display: taskStep.step.is_complete ? "none" : "" }}>
                        </Icon>
                        <Icon
                            name="check square outline"
                            style={{ display: taskStep.step.is_complete ? "" : "none" }}
                        />                        
                        {taskStep.step.name}
                         
                      </li>
                      <Icon 
                        name="edit outline" 
                        onClick={() => props.history.push(`/step/${taskStep.step.url.split("/")[4]}`)}>                            
                      </Icon>
                      <Icon 
                        name="trash alternate outline" 
                        onClick={() => props.deleteStep(taskStep.step.url.split("/")[4]) } 
                        style={{ display: taskStep.step.is_complete ? "none" : "" }}>
                      </Icon>                    
                    </div>
                ))}
            </ul>
            <Icon name="add" onClick={() => props.history.push(`/addstep/${props.task.id}`)} style={{ display: props.task.is_complete ? "none" : "" }}></Icon>
            <Icon name="edit outline" onClick={() => props.history.push(`/task/${props.task.id}`)}></Icon>
            <Icon name="trash alternate outline" onClick={() => props.deleteTask(props.task.id)}></Icon>
            </Card.Content>
            <Card.Content style={{ height: '100px' }} extra>
            <Progress size='large' value={complete} total={taskSteps.length} progress='ratio' >Test Label</Progress>
            </Card.Content>
            </Card>
        );
    } else {
        return (
            <Card className="taskCard">  
            <Card.Content>
            <Card.Header>
                {props.task.name}
                <Icon 
                name="square outline" 
                onClick={() => completeTask(props.task.id)} 
                style={{ display: props.task.is_complete ? "none" : "" }}>                    
                </Icon>
            <Icon name="check square outline" style={{ display: props.task.is_complete ? "" : "none" }} />
            </Card.Header>
            </Card.Content>
            <Card.Content>
            <p>{props.task.discription}</p>
            <button onClick={() => props.history.push(`/addstep/${props.task.id}`)} style={{ display: props.task.is_complete ? "none" : "" }}>Add Steps</button>
            <Icon name="edit outline" onClick={() => props.history.push(`/task/${props.task.id}`)}></Icon>
            <Icon name="trash alternate outline" onClick={() => props.deleteTask(props.task.id)}></Icon>
            <button onClick={() => completeTask(props.task.id)} style={{ display: props.task.is_complete ? "none" : "" }}>Complete Task</button>
            </Card.Content>
            </Card>
        );
    }

  };
  
  export default TaskCard;
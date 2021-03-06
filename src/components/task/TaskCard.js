import React, { useState, useEffect } from "react";
import TaskStepManager from "../../modules/TaskStepManager";
import TaskManager from "../../modules/TaskManager";
import StepForm from "../step/StepForm"
import StepEdit from "../step/StepEdit"
import { Icon, Card, Progress, Modal, Header, Button, Image } from 'semantic-ui-react'

// import StepManager from "../../modules/StepManager";
// import { Redirect } from "react-router-dom";

const TaskCard = (props) => {
    const [taskSteps, setTaskSteps] = useState([])
    const quantity = taskSteps.length
    const [complete, setComplete] = useState(0)




    const CompleteStepModal = (props) => (
        <Modal trigger={<Icon className="clickable" name="add" size='large'></Icon>}>
            <Modal.Header>Add a Step</Modal.Header>
            <Modal.Content>

                <StepForm {...props} taskId={props.task.id} getTasks={props.getTasks} />

            </Modal.Content>
        </Modal>
    )

    const StepEditModal = (props) => (
        <Modal trigger={<Icon className="clickable" name="edit outline"></Icon>}>
            <Modal.Header>Edit Step</Modal.Header>
            <Modal.Content>

                <StepEdit {...props} stepId={props.stepId} getTasks={props.getTasks} />

            </Modal.Content>
        </Modal>
    )

    const completeTask = (taskId) => {
        const taskObj = { "is_complete": true }
        TaskManager.completeTask(taskObj, taskId)
            .then(() => {
                taskSteps.forEach(taskStep => {
                    props.completeStep(parseInt(taskStep.step.url.split("/")[4]))
                })
            }).then(props.getTasks)
    }

    const undoCompleteTask = (taskId) => {
        const taskObj = { "is_complete": false }
        TaskManager.completeTask(taskObj, taskId)
            .then(props.getTasks)
    }

    useEffect(() => {
        TaskStepManager.getTaskStepsByTask(props.task.id)
            .then(response => {
                setTaskSteps(response)
                let count = 0
                response.forEach(step => {
                    if (step.step.is_complete === true) {
                        count = count + 1
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
                        <div className="task-card-header">
                            {props.task.name}
                            <Icon
                                className="clickable"
                                name="square outline"
                                size="large"
                                onClick={() => completeTask(props.task.id)}
                                style={{ display: props.task.is_complete ? "none" : "" }}>
                            </Icon>
                            <Icon
                                className="clickable"
                                name="check square outline"
                                size="large"
                                onClick={() => undoCompleteTask(props.task.id)}
                                style={{ display: props.task.is_complete ? "" : "none" }} />
                        </div>
                    </Card.Header>

                    <Card.Meta>
                        {props.task.description}
                    </Card.Meta>

                </Card.Content>
                <Card.Content>
                    <ul>
                        {taskSteps.map(taskStep => (
                            <div key={taskStep.id}>
                                <li className="step-flex">
                                    <div>
                                        <Icon
                                            className="clickable"
                                            name="square outline"
                                            title="Complete Step"
                                            onClick={() => props.completeStep(parseInt(taskStep.step.url.split("/")[4]))}
                                            style={{ display: taskStep.step.is_complete ? "none" : "" }}>
                                        </Icon>
                                        <Icon
                                            className="clickable"
                                            name="check square outline"
                                            style={{ display: taskStep.step.is_complete ? "" : "none" }}
                                            onClick={() => props.undoCompleteStep(parseInt(taskStep.step.url.split("/")[4]))}
                                        />
                                        {taskStep.step.name}
                                    </div>

                                    <div style={{ flexDirection: "row", display: taskStep.step.is_complete ? "none" : "flex" }}>                   
                                        <StepEditModal                                             
                                            stepId={parseInt(taskStep.step.url.split("/")[4])} 
                                            {...props} 
                                        />
                                        <Icon
                                            className="clickable"
                                            name="trash alternate outline"
                                            onClick={() => props.deleteStep(taskStep.id)}
                                            style={{ display: taskStep.step.is_complete ? "none" : "" }}>
                                        </Icon>
                                    </div>
                                </li>
                            </div>
                        ))}
                    </ul>

                    <div className="step-flex">
                        <div>
                            <Icon
                                className="clickable"
                                name="edit outline"
                                style={{ display: props.task.is_complete ? "none" : "" }}
                                onClick={() => props.history.push(`/task/${props.task.id}`)}>                           
                            </Icon>
                            <Icon
                                className="clickable"
                                name="trash alternate outline"
                                onClick={() => props.deleteTask(props.task.id)}>                                    
                            </Icon>
                        </div>
                        <div style={{ display: props.task.is_complete ? "none" : "" }}>
                            <CompleteStepModal {...props} />
                        </div>
                    </div>

                </Card.Content>
                <Card.Content extra>
                    {/* TODO: best avail. colors: olive, blue, violet, pink, red */}
                    <Progress size='medium' color="red" inverted value={complete} total={taskSteps.length} progress='ratio' />
                </Card.Content>
            </Card>
        );
    } else {
        return (
            <Card className="taskCard">
                <Card.Content>
                    <Card.Header>
                        <div className="task-card-header">
                            {props.task.name}
                            <Icon
                                className="clickable"
                                name="square outline"
                                size="large"
                                onClick={() => completeTask(props.task.id)}
                                style={{ display: props.task.is_complete ? "none" : "" }}>
                            </Icon>
                            <Icon
                                className="clickable"
                                name="check square outline"
                                size="large"
                                onClick={() => undoCompleteTask(props.task.id)}
                                style={{ display: props.task.is_complete ? "" : "none" }} />
                        </div>
                    </Card.Header>
                    <Card.Meta>
                        {props.task.description}
                    </Card.Meta>
                </Card.Content>
                <Card.Content>
                    <div className="step-flex">
                        <div>
                            <Icon
                                className="clickable"
                                name="edit outline"
                                style={{ display: props.task.is_complete ? "none" : "" }}
                                onClick={() => props.history.push(`/task/${props.task.id}`)}>                                    
                            </Icon>
                            <Icon
                                className="clickable"
                                name="trash alternate outline"
                                onClick={() => props.deleteTask(props.task.id)}>
                            </Icon>
                        </div>
                        <div style={{ display: props.task.is_complete ? "none" : "" }}>
                            <CompleteStepModal {...props} />
                        </div>
                    </div>
                </Card.Content>
            </Card>
        );
    }

};

export default TaskCard;
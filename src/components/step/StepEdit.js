import React, { useState, useEffect } from "react";
import StepManager from "../../modules/StepManager";
import TaskManager from "../../modules/TaskManager";
import TaskStepManager from "../../modules/TaskStepManager";
import { Form, Button, Select } from "semantic-ui-react"

const StepEditForm = (props) => {
    const [step, setStep] = useState({ id: "", name: "", description: "" })
    const [tasks, setTasks] = useState([])
    const [taskIdObj, setTaskIdObj] = useState({ taskId: "" })

    const getStep = () => {
        console.log(props.stepId)
        return StepManager.getStep(props.stepId)
            .then(response => {
                setStep(response)
            })
    }

    const getTasks = () => {
      return TaskManager.getTasksByUser()
        .then(response => {
          setTasks(response)})
    }

    const handleFieldChange = (evt) => {
        const stateToChange = { ...step };
        stateToChange[evt.target.id] = evt.target.value;
        setStep(stateToChange);
      };

    const handleTaskSelectChange = (evt) => {
      const stateToChange = { taskIdObj }
      stateToChange[evt.target.id] = evt.target.value;
      setTaskIdObj(stateToChange)
    }

    const updateStep = (evt) => {
        evt.preventDefault();
        let description = step.description
        if(step.description === "") {
          description = null
        }

        const updatedStep = {
          "name": step.name,
          "description": description
        } 

        StepManager.updateStep(updatedStep, parseInt(step.id))
            .then(props.getTasks);
    };

    const addTaskStep = () => {
      const newTaskStepObj = {
        "step_id": step.id,
        "task_id": parseInt(taskIdObj.taskId)
      }
      TaskStepManager.addTaskStep(newTaskStepObj)
        .then(props.getTasks)
    }

    useEffect(() => {
        getStep()
        getTasks()
      }, [])

    return (
      <div>
      
      <Form onSubmit={updateStep}>
        <Form.Field>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            required
            onChange={handleFieldChange}
            id="name"
            value={step.name}
          />
        </Form.Field>
        <Form.Field>
          <label htmlFor="description">Description</label>
          <textarea
            type="textarea"
            onChange={handleFieldChange}
            id="description"
            value={step.description === null ? ("") : (step.description)}
          />
        </Form.Field>
        
        <Form.Field>
          <Button style={{'background-color': "var(--main-accent-color)", color: 'var(--white)'}} type="submit">Save Changes</Button>
        </Form.Field>
      </Form>

      <Form className="edit-step-margin" onSubmit={addTaskStep}>
        <Form.Field>
        <h3>Connect step to another task?</h3>
            <select
            id="taskId"
            // value={task.listId}
            onChange={handleTaskSelectChange}
            >  
            <option>Select a Task</option>
            {tasks.map(task =>
                <option key={task.id} value={task.id}>
                {task.name}
                </option>
            )}
            </select>
            </Form.Field>
            <Form.Field>
            <Button type="submit" style={{'background-color': 'var(--main-accent-color)', color: 'var(--white)'}}>Add</Button>
            </Form.Field>
      </Form>
      </div>
    );
}

export default StepEditForm;
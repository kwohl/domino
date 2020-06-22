import React, { useState, useEffect } from "react";
import StepManager from "../../modules/StepManager";
import TaskManager from "../../modules/TaskManager";
import TaskStepManager from "../../modules/TaskStepManager";

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
            .then(() => props.history.push(`/lists`));
    };

    const addTaskStep = () => {
      const newTaskStepObj = {
        "step_id": step.id,
        "task_id": parseInt(taskIdObj.taskId)
      }
      TaskStepManager.addTaskStep(newTaskStepObj)
        .then(() => props.history.push(`/lists`))
    }

    useEffect(() => {
        getStep()
        getTasks()
      }, [])

    return (
      <div className="pageContent">
      <h1>{step.name}</h1>
      <form onSubmit={updateStep}>
        <fieldset>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            required
            onChange={handleFieldChange}
            id="name"
            value={step.name}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="description">Description:</label>
          <textarea
            type="textarea"
            onChange={handleFieldChange}
            id="description"
            value={step.description === null ? ("") : (step.description)}
          />
        </fieldset>
        
        <fieldset>
          <button type="submit">Save Changes</button>
        </fieldset>
      </form>

      <div>
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
            <button onClick={addTaskStep}>Add</button>
      </div>
      </div>
    );
}

export default StepEditForm;
import React, { useEffect, useState } from "react";
import TaskManager from "../../modules/TaskManager";
import TaskStepManager from "../../modules/TaskStepManager";
import StepManager from "../../modules/StepManager";

const StepForm = (props) => {
    const [newStep, setNewStep] = useState({ name: "", description: "" })

    const handleFieldChange = evt => {
        const stateToChange = { ...newStep }
        stateToChange[evt.target.id] = evt.target.value
        setNewStep(stateToChange)
    }

    const handleSubmit = evt => {
        evt.preventDefault()
        
        let description = newStep.description

        if(newStep.description === ""){
            description = null
        }

        const newStepObj = {
            "name": newStep.name,
            "description": description
        }

        StepManager.addStep(newStepObj)
            .then(response => 
                TaskStepManager.addTaskStep({
                    "step_id": response.id,
                    "task_id": props.taskId
                })
                )
                .then(props.history.push(`/lists`))

    }

    useEffect(() => {
        
    }, [])

    return (
        <div className="pageContent">
            <form onSubmit={handleSubmit}>
            <h1>Add a Step</h1>
            <fieldset>
                <label htmlFor="name"> Name </label>
                <input onChange={handleFieldChange} type="text"
                id="name"
                required="" autoFocus="" value={newStep.name} />
            </fieldset>

            <fieldset>
                <label htmlFor="description"> Description </label>
                <textarea onChange={handleFieldChange} type="textarea"
                id="description"
                required="" autoFocus="" value={newStep.description} />
            </fieldset>

            <fieldset>
                <button type="submit">Submit</button>
            </fieldset>

            </form>
        </div>
    );
};

export default StepForm;
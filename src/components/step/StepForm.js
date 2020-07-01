import React, { useEffect, useState } from "react";
import TaskStepManager from "../../modules/TaskStepManager";
import StepManager from "../../modules/StepManager";
import { Form, Button } from "semantic-ui-react"

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
                ).then(props.getTasks)
    }

    useEffect(() => {
        
    }, [])
    
    return (
        <div>
            <Form onSubmit={handleSubmit}>            
            <Form.Field>
                <label htmlFor="name"> Name </label>
                <input onChange={handleFieldChange} type="text"
                id="name"
                required="" autoFocus="" value={newStep.name} />
            </Form.Field>

            <Form.Field>
                <label htmlFor="description"> Description </label>
                <textarea onChange={handleFieldChange} type="textarea"
                id="description"
                required="" autoFocus="" value={newStep.description} />
            </Form.Field>

            <Form.Field>
                <Button style={{'backgroundColor': "var(--main-accent-color)", color: 'var(--white)'}} type="submit">Submit</Button>
            </Form.Field>

            </Form>
        </div>
    );
};

export default StepForm;
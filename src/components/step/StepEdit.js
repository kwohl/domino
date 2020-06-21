import React, { useState, useEffect } from "react";
import StepManager from "../../modules/StepManager";

const StepEditForm = (props) => {
    const [step, setStep] = useState({ id: "", name: "", description: "" })

    const getStep = () => {
        console.log(props.stepId)
        return StepManager.getStep(props.stepId)
            .then(response => {
                setStep(response)
            })
    }

    const handleFieldChange = (evt) => {
        const stateToChange = { ...step };
        stateToChange[evt.target.id] = evt.target.value;
        setStep(stateToChange);
      };

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

    useEffect(() => {
        getStep()
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
        </div>
    );
}

export default StepEditForm;
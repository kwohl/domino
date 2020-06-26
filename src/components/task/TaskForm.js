import React, { useEffect, useState } from "react";
import TaskManager from "../../modules/TaskManager";
import ListManager from "../../modules/ListManager";

const TaskForm = (props) => {
    const [newTask, setNewTask] = useState({ name: "", description: "", taskListId: "" })
    const [lists, setLists] = useState([])

    const handleFieldChange = evt => {
        const stateToChange = { ...newTask }
        stateToChange[evt.target.id] = evt.target.value
        setNewTask(stateToChange)

        console.log(newTask.taskListId)
    }

    const handleSubmit = evt => {
        evt.preventDefault()
        
        let description = newTask.description

        if(newTask.description === ""){
            description = null
        }

        const newTaskObj = {
            "name": newTask.name,
            "description": description,
            "task_list_id": parseInt(newTask.taskListId)
        }

        TaskManager.addTask(newTaskObj)
            .then(() => props.history.push(`/list/${newTask.taskListId}`))
    }

    useEffect(() => {
        ListManager.getAllLists()
            .then(allLists => {
                setLists(allLists)
            })
    }, [])

    return (
        <div className="pageContent">
            <h1 className="title">Add a Task</h1>
            
            <form className="task-form" onSubmit={handleSubmit}>
            <fieldset className="field">
                <label className="label" htmlFor="taskListId"> List </label>
                <div className="control is-expanded">
                <div className="select is-fullwidth">
                <select
                
                id="taskListId"
                required
                value={newTask.taskListId}
                onChange={handleFieldChange}>
                <option value="">Select a List</option>
                {lists.map(list =>
                    <option key={list.id} value={list.id}>
                    {list.name}
                    </option>
                )}
                </select>
                </div>
                </div>
            </fieldset>

            <fieldset className="field">
                <label className="label" htmlFor="name"> Name </label>
                <div className="control">
                <input className="input" onChange={handleFieldChange} type="text"
                id="name"
                required="" autoFocus="" value={newTask.name} />
                </div>
            </fieldset>

            <fieldset className="field">
                <label className="label" htmlFor="description"> Description </label>
                <div className="control">
                <textarea className="textarea" onChange={handleFieldChange} type="textarea"
                id="description"
                required="" autoFocus="" value={newTask.description} />
                </div>
            </fieldset>

            <fieldset className="field">
                <button className="button" type="submit">Submit</button>
            </fieldset>

            </form>
        </div>
    );
};

export default TaskForm;
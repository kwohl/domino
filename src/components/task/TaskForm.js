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
            <form onSubmit={handleSubmit}>
            <h1>Add a Task</h1>
            <fieldset>
                <label htmlFor="taskListId"> List </label>
                <select
                id="taskListId"
                required
                value={newTask.taskListId}
                onChange={handleFieldChange}>
                <option value="">-</option>
                {lists.map(list =>
                    <option key={list.id} value={list.id}>
                    {list.name}
                    </option>
                )}
                </select>
            </fieldset>

            <fieldset>
                <label htmlFor="name"> Name </label>
                <input onChange={handleFieldChange} type="text"
                id="name"
                required="" autoFocus="" value={newTask.name} />
            </fieldset>

            <fieldset>
                <label htmlFor="description"> Description </label>
                <textarea onChange={handleFieldChange} type="textarea"
                id="description"
                required="" autoFocus="" value={newTask.description} />
            </fieldset>

            <fieldset>
                <button type="submit">Submit</button>
            </fieldset>

            </form>
        </div>
    );
};

export default TaskForm;
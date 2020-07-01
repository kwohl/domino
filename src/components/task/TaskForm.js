import React, { useEffect, useState } from "react";
import TaskManager from "../../modules/TaskManager";
import ListManager from "../../modules/ListManager";
import { Form, Button } from "semantic-ui-react";

const TaskForm = (props) => {
    const [newTask, setNewTask] = useState({ name: "", description: "", taskListId: "" })
    const [lists, setLists] = useState([])

    const handleFieldChange = evt => {
        const stateToChange = { ...newTask }
        stateToChange[evt.target.id] = evt.target.value
        setNewTask(stateToChange)
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
            <h1 className="page-header">Add a Task</h1>
            
            <Form className="task-form" onSubmit={handleSubmit}>
            <Form.Field>
                <label htmlFor="taskListId"><span className="form-label"> List </span></label>
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
            </Form.Field>

            <Form.Field>
                <label htmlFor="name"><span className="form-label"> Name </span></label>
                <div className="control">
                <input className="input" onChange={handleFieldChange} type="text"
                id="name"
                required autoFocus="" value={newTask.name} />
                </div>
            </Form.Field>

            <Form.Field>
                <label htmlFor="description"><span className="form-label"> Description </span></label>
                <div className="control">
                <textarea 
                    className="textarea" onChange={handleFieldChange} 
                    type="textarea"
                    id="description"
                    autoFocus="" 
                    value={newTask.description} 
                />
                </div>
            </Form.Field>

            <Form.Field>
                <Button type="submit" style={{'backgroundColor': "var(--main-accent-color)", color: 'var(--white)'}}>Submit</Button>
            </Form.Field>

            </Form>
        </div>
    );
};

export default TaskForm;
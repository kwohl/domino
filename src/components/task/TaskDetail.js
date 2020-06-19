import React, { useState, useEffect } from "react";
import TaskManager from "../../modules/TaskManager";
import ListManager from "../../modules/ListManager";

const TaskDetail = (props) => {
    const [task, setTask] = useState({ id: "", name: "", description: "", taskListId: "" })
    const [lists, setLists] = useState([])

    const getTask = () => {
        return TaskManager.getTask(props.taskId)
            .then(response => {
                setTask(response)
            })
    }

    const handleFieldChange = (evt) => {
        const stateToChange = { ...task };
        stateToChange[evt.target.id] = evt.target.value;
        setTask(stateToChange);
      };

    const updateTask = (evt) => {
    evt.preventDefault();

    TaskManager.updateTask(task).then(() => props.history.push("/"));
    };

    useEffect(() => {
        getTask()
        ListManager.getAllLists()
        .then(response => {
          setLists(response);
        })
      }, [])

    return (
        <div className="pageContent">
      <h1>{task.name}</h1>
      <form onSubmit={updateTask}>
        <fieldset>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            required
            onChange={handleFieldChange}
            id="name"
            value={task.name}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            required
            onChange={handleFieldChange}
            id="description"
            value={task.description}
          />
        </fieldset>
        <fieldset>
            <label htmlFor="taskListId"> List </label>
            <select
            id="taskListId"
            value={task.taskListId}
            onChange={handleFieldChange}>
            {lists.map(list =>
                <option key={list.id} value={list.id}>
                {list.name}
                </option>
            )}
            </select>
        </fieldset>
        
        <fieldset>
          <button type="submit">Save Changes</button>
        </fieldset>
      </form>
        </div>
    );
}

export default TaskDetail;
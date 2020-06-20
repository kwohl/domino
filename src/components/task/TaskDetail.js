import React, { useState, useEffect } from "react";
import TaskManager from "../../modules/TaskManager";
import ListManager from "../../modules/ListManager";

const TaskDetail = (props) => {
    const [task, setTask] = useState({ id: "", name: "", description: "", task_list: "" })
    const [lists, setLists] = useState([])
    const [taskList, setTaskList] = useState({})
    const [listId, setListId] = useState(0)

    const getTask = () => {
        return TaskManager.getTask(props.taskId)
            .then(response => {
                setTask(response)
                setTaskList(response.task_list)
                const listIdNumber = parseInt(response.task_list.url.split("/")[4])
                setListId(listIdNumber)
                console.log(response)
            })
    }

    const handleFieldChange = (evt) => {
        const stateToChange = { ...task };
        stateToChange[evt.target.id] = evt.target.value;
        if(evt.target.id === "task_list") {
          setListId(evt.target.value)
        }
        setTask(stateToChange);
      };

    const updateTask = (evt) => {
        evt.preventDefault();
        const updatedTask = {
          "name": task.name,
          "description": task.description,
          "task_list_id": Number(listId)
        } 

        console.log(updatedTask)
        TaskManager.updateTask(updatedTask, parseInt(task.id)).then(() => props.history.push(`/list/${parseInt(listId)}`));
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
            <label htmlFor="task_list"> List </label>
            <select
            id="task_list"
            defaultValue={task.listId}
            onChange={handleFieldChange}>
            <option value={listId}>{taskList.name}</option>  
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
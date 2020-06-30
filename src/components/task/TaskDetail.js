import React, { useState, useEffect } from "react";
import TaskManager from "../../modules/TaskManager";
import ListManager from "../../modules/ListManager";
import { Form, Button } from "semantic-ui-react";

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
        let description = task.description
        if(task.description === "") {
          description = null
        }

        const updatedTask = {
          "name": task.name,
          "description": description,
          "task_list_id": Number(listId)
        } 

        TaskManager.updateTask(updatedTask, parseInt(task.id))
          .then(() => props.history.push(`/list/${parseInt(listId)}`));
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
      <h1 className="page-header">{task.name}</h1>
      <Form className="task-form" onSubmit={updateTask}>
        <Form.Field>
          <label htmlFor="name"><span className="form-label">Name</span></label>
          <input
            type="text"
            required
            onChange={handleFieldChange}
            id="name"
            value={task.name}
          />
        </Form.Field>
        <Form.Field>
          <label htmlFor="description"><span className="form-label">Description</span></label>
          <textarea
            type="text"
            onChange={handleFieldChange}
            id="description"
            value={task.description === null ? ("") : (task.description)}
          />
        </Form.Field>
        <Form.Field>
            <label htmlFor="task_list"><span className="form-label"> List </span></label>
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
        </Form.Field>
        
        <Form.Field>
          <Button type="submit" style={{'background-color': "var(--main-accent-color)", color: 'var(--white)'}}>Save Changes</Button>
        </Form.Field>
      </Form>
        </div>
    );
}

export default TaskDetail;
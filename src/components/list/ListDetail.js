import React, { useState, useEffect } from "react";
import ListManager from "../../modules/ListManager";
import TaskManager from "../../modules/TaskManager";

const ListDetail = (props) => {
    const [list, setList] = useState({ name: "", description: "" })
    const [tasks, setTasks] = useState([])


    const getList = () => {
      ListManager.getList(props.listId)
        .then(response => {
          setList(response);
        })
    };

    const getTasks = () => {
      TaskManager.getTasksByUser(props.listId)
        .then(response => {
          setTasks(response);
        })
    };

    useEffect(() => {
      getList()
      getTasks()
    }, [])
    
    return (
      <div className="pageContent">
          <h3>{list.name}</h3>
          <p><strong>{list.description}</strong></p>
          <div>
            {tasks.map(task => (
              <p key={task.id}>{task.name}</p>
            ))}
          </div>
          <div>
              <button onClick={() => props.history.push("/addtask")}>Add New Task</button>
          </div>
      </div>
    );
  };
  
  export default ListDetail;
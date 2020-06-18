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
          console.log(response)
        })
    };

    useEffect(() => {
      getList()
      getTasks()
    }, [])
    
    return (
      <div className="pageContent">
          <h3>{list.name}</h3>
          <p>{list.description}</p>
          <div>
            {tasks.map(task => (
              <p key={task.id}>{task.name}</p>
            ))}
          </div>
      </div>
    );
  };
  
  export default ListDetail;
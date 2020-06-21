import React, { useState, useEffect } from "react";
import ListManager from "../../modules/ListManager";
import TaskManager from "../../modules/TaskManager";
import TaskStepManager from "../../modules/TaskStepManager";
import TaskCard from "../task/TaskCard";

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

    const taskStepTest = () => {
      const stepsArray = []
      tasks.forEach(task => {
        TaskStepManager.getTaskStepsByTask(task.id)
          .then(taskSteps => taskSteps.forEach(taskStep => stepsArray.push([task.id, taskStep.step])))
      })
      console.log(stepsArray)
    }

  
    // const getTaskSteps = (taskId) => {
    //   TaskStepManager.getTaskStepsByTask(taskId)
    //     .then(response => response.map(taskStep => {
    //       <p>{taskStep.step.name}</p>
    //     }))
    // }

    // {TaskStepManager.getTaskStepsByTask(task.id)
    //   .then(response => response.map(taskStep => {
    //     <li>{taskStep.step.name}</li>
    //   }))
    // }
    // const stepsArray = tasks.reduce(task => {
    //   if (!stepsArray[task.id]) {
    //     stepsArray[task.id] = []
    //   }
    //   TaskStepManager.getTaskStepsByTask(task.id)
    //     .then(taskSteps => taskSteps.forEach(taskStep => stepsArray[task.id].push(taskStep.step)))
    //   return stepsArray
    // }, {})
    // console.log(stepsArray)
  


    const deleteTask = (taskId) => {
        if (window.confirm("Would you like to remove this task from your list?")) {
            TaskManager.deleteTask(taskId)
                .then(getTasks)
        }
    }

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
              <TaskCard
                key={task.id}
                task={task}
                deleteTask={deleteTask}
                taskStepTest={taskStepTest}
                {...props}
              />
            ))}
          </div>
          <div>
              <button onClick={() => props.history.push("/addtask")}>Add New Task</button>
          </div>
      </div>
    );
  };
  
  export default ListDetail;

  // return (
  //   <div className="pageContent">
  //       <h3>{list.name}</h3>
  //       <p><strong>{list.description}</strong></p>
  //       <div>
  //         {tasks.map(task => (
  //           <div key={task.id}>  
  //           <p onClick={() => taskStepTest()}>{task.name}</p>
  //           <p>{task.discription}</p>
  //           <button onClick={() => deleteTask(task.id)}>Delete</button>
  //           <button onClick={() => props.history.push(`/task/${task.id}`)}>Edit</button>
  //           </div>
  //         ))}
  //       </div>
  //       <div>
  //           <button onClick={() => props.history.push("/addtask")}>Add New Task</button>
  //       </div>
  //   </div>
  // );
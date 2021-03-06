const baseUrl = "http://localhost:8000"

export default {
  getTask(task_id) {
    return fetch(`${baseUrl}/tasks/${task_id}`)
      .then(response => response.json())
  },
  getAllTasks() {
      return fetch(`${baseUrl}/tasks`)
        .then(response => response.json())
  },
  getTasksByList(list_id) {
    return fetch(`${baseUrl}/tasks?list=${list_id}`, {
        "method": "GET",
        "headers": {
            "Accept": "application/json",
            "Authorization": `Token ${sessionStorage.getItem("domino-token")}`
        }
    })
    .then(response => response.json())
  },
  getTasksByUser() {
    return fetch(`${baseUrl}/tasks`, {
        "method": "GET",
        "headers": {
            "Accept": "application/json",
            "Authorization": `Token ${sessionStorage.getItem("domino-token")}`
        }
    })
    .then(response => response.json())
  },
  addTask(newTask) {
    return fetch(`${baseUrl}/tasks`, {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Token ${sessionStorage.getItem("domino-token")}`,
        },
        "body": JSON.stringify(newTask)
    }).then(response => response.json())
  },
  deleteTask(taskId) {
    return fetch(`${baseUrl}/tasks/${taskId}`, {
        "method": "DELETE",
        "headers": {
            "Authorization": `Token ${sessionStorage.getItem("domino-token")}`
        }
    })
  },
  updateTask(updatedTask, taskId) {
    return fetch(`${baseUrl}/tasks/${taskId}`, {
      "method": "PUT",
      "headers": {
        "Content-Type": "application/json",
        "Authorization": `Token ${sessionStorage.getItem("domino-token")}`,
      },
      "body": JSON.stringify(updatedTask),
    });
  },
  completeTask(updatedTask, taskId) {
    return fetch(`${baseUrl}/tasks/${taskId}?complete`, {
      "method": "PUT",
      "headers": {
        "Content-Type": "application/json",
        "Authorization": `Token ${sessionStorage.getItem("domino-token")}`,
      },
      "body": JSON.stringify(updatedTask),
    });
  }
}
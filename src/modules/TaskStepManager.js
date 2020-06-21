const baseUrl = "http://localhost:8000"

export default {
  getTaskStep(taskStep_id) {
    return fetch(`${baseUrl}/tasksteps/${taskStep_id}`)
      .then(response => response.json())
  },
  getTaskSteps() {
      return fetch(`${baseUrl}/tasksteps`)
        .then(response => response.json())
  },
  getTaskStepsByTask(task_id) {
    return fetch(`${baseUrl}/tasksteps?task=${task_id}`, {
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
  }
}
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
  getTasksByUser(list_id) {
    return fetch(`${baseUrl}/tasks?list=${list_id}`, {
        "method": "GET",
        "headers": {
            "Accept": "application/json",
            "Authorization": `Token ${sessionStorage.getItem("domino-token")}`
        }
    })
    .then(response => response.json())
  },
}
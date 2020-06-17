const baseUrl = "http://localhost:8000"

export default {
  getTask(task_id) {
    return fetch(`${baseUrl}/tasks/${task_id}`)
      .then(response => response.json())
  },
  getAllTasks() {
      return fetch(`${baseUrl}/tasks`)
        .then(response => response.json())
  }
}
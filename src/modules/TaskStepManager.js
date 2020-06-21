const baseUrl = "http://localhost:8000"

export default {
  getTaskStepsByTask(task_id) {
    return fetch(`${baseUrl}/tasksteps?task=${task_id}`, {
        "method": "GET",
        "headers": {
            "Accept": "application/json",
            "Authorization": `Token ${sessionStorage.getItem("domino-token")}`
        }
    })
    .then(response => response.json())
  }
}
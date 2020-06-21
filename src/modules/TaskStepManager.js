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
  },
  addTaskStep(newTaskStep) {
    return fetch(`${baseUrl}/tasksteps`, {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Token ${sessionStorage.getItem("domino-token")}`,
        },
        "body": JSON.stringify(newTaskStep)
    }).then(response => response.json())
  }
}
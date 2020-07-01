const baseUrl = "http://localhost:8000"

export default {
  getStep(step_id) {
    return fetch(`${baseUrl}/steps/${step_id}`)
      .then(response => response.json())
  },
  getAllSteps() {
      return fetch(`${baseUrl}/steps`)
        .then(response => response.json())
  },
  addStep(newStep) {
    return fetch(`${baseUrl}/steps`, {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Token ${sessionStorage.getItem("domino-token")}`,
        },
        "body": JSON.stringify(newStep)
    }).then(response => response.json())
  },
  deleteStep(stepId) {
    return fetch(`${baseUrl}/steps/${stepId}`, {
        "method": "DELETE",
        "headers": {
            "Authorization": `Token ${sessionStorage.getItem("domino-token")}`
        }
    })
  },
  updateStep(updatedStep, stepId) {
    return fetch(`${baseUrl}/steps/${stepId}`, {
      "method": "PUT",
      "headers": {
        "Content-Type": "application/json",
        "Authorization": `Token ${sessionStorage.getItem("domino-token")}`,
      },
      "body": JSON.stringify(updatedStep),
    });
  },
  completeStep(updatedStep, stepId) {
    return fetch(`${baseUrl}/steps/${stepId}?complete`, {
      "method": "PUT",
      "headers": {
        "Content-Type": "application/json",
        "Authorization": `Token ${sessionStorage.getItem("domino-token")}`,
      },
      "body": JSON.stringify(updatedStep),
    });
  }
}
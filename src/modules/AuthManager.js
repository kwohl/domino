const baseUrl = "http://localhost:8000"

export default {
  registerUser(newUser) {
    return fetch(`${baseUrl}/register/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(newUser)
    })
      .then(response => response.json())
  },
  loginUser(userCreds) {
    return fetch(`${baseUrl}/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(userCreds)
    })
      .then(response => response.json())
  }
}
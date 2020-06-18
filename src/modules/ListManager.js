const baseUrl = "http://localhost:8000"

export default {
  getList(list_id) {
    return fetch(`${baseUrl}/taskLists/${list_id}`)
      .then(response => response.json())
  },
  getAllLists(){
      return fetch(`${baseUrl}/taskLists`)
        .then(response => response.json())
  }
}
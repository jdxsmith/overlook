export let apiData = {
    fetchUserData() {
      return fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users')
        .then(response => response.json())
        .then(data => data.users)
        .catch(error => console.log(error.message));
    },
  
    fetchRoomData() {
        return fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms')
          .then(response => response.json())
          .then(data => data.rooms)
          .catch(error => console.log(error.message));
      },
  
}
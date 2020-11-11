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
  
    fetchBookingData() {
        return fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings')
            .then(response => response.json())
            .then(data => data.bookings)
            .catch(error => console.log(error.message));
    },

    postBooking(booking) {
        return fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings', {
          method: 'POST',
          headers: {
                'Content-Type': 'application/json'
          },
          body: JSON.stringify(booking)
        })
        .then(response => response.json())
        .catch(error => console.log(error.message));
    },
    
      deleteBooking(booking) {
        return fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings', {
          method: 'DELETE',
          headers: {
                'Content-Type': 'application/json'
          },
          body: JSON.stringify(booking)
        })
        .then(response => response.json())
        .catch(error => console.log(error.message));
    }
}
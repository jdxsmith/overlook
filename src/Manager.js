class Manager {
    constructor(username) {
        this.username = username;
        this.password = 'overlook2020';
        this.date = new Date().toDateString();
    }

    confirmManagerLogin(enteredPassword) {
        if (enteredPassword === this.password) {
            return 'Welcome manager!';
        } else {
            return 'Incorrect username or password. Please try again.';
        }
    }

    getTodaysBookings(bookings) {
        return bookings.filter(booking => {
            return booking.date === this.date;
        })
    }
}
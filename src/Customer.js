class Customer {
    constructor(username, name) {
        this.username = username;
        this.name = name;
        this.password = 'overlook2020';
        if (username.includes('customer')) {
            this.id = parseInt(username.slice(8))
        } else {
            this.id = 0
        };
        this.date = new Date().toDateString();
        this.amountSpent = 0;
        this.presentBookings = [];
        this.futureBookings = [];
        this.pastBookings = [];
    }

    confirmCustomerLogin(enteredPassword) {
        if (enteredPassword === this.password) {
            return 'valid credentials';
        } else {
            return 'Incorrect username or password. Please try again.';
        }
    }

    calculateAmountSpent(hotel, bookings) {
        const customerBookings = this.getCustomerBookings(bookings);
        hotel.rooms.forEach(room => {
            customerBookings.forEach(booking => {
                if (booking.roomNumber === room.number) {
                    this.amountSpent += room.costPerNight;
                }
            })
        })
    }

    getCustomerBookings(bookings) {
        return bookings.filter(booking => {
            return booking.userID === this.id;
        })
    }

    sortCustomerBookings(bookings) {
        const customerBookings = this.getCustomerBookings(bookings);
        customerBookings.forEach(booking => {
            if (booking.date === this.date) {
                this.presentBookings.push(booking);
            } else if (Date.parse(booking.date) > Date.parse(this.date)) {
                this.futureBookings.push(booking);
            } else {
                this.pastBookings.push(booking);
            }
        })
    }
}

export { Customer }
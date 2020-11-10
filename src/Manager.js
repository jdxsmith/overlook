import Customer from '../src/Customer';

class Manager {
    constructor(username) {
        this.username = username;
        this.id = 0;
        this.password = 'overlook2020';
        this.date = new Date().toISOString().split('T')[0];
    }

    confirmManagerLogin(enteredPassword) {
        if (enteredPassword === this.password && this.username.includes('manager')) {
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

    calculateTodaysIncome(bookings, hotel) {
        const bookedRooms = this.getTodaysBookings(bookings);
        return hotel.rooms.reduce((todaysIncome, room) => {
            bookedRooms.forEach(booking => {
                if (room.number === booking.roomNumber) {
                    todaysIncome += room.costPerNight;
                }
            })
            return todaysIncome;
        }, 0)
    }

    calculateTodaysOccupancy(bookings, totalRooms) {
        const bookedRooms = this.getTodaysBookings(bookings);
        const occupancyPercentage = Math.round(bookedRooms.length / totalRooms * 100);
        return `${occupancyPercentage}%`;
    }

    findCustomerByName(customerName, customers) {
        const targetedCustomer = customers.find(customer => {
            return customerName === customer.name;
        })
        if (targetedCustomer) {
            const customerInfo = new Customer(`customer${targetedCustomer.id}`, targetedCustomer.name);
            customerInfo.id = targetedCustomer.id;
            return customerInfo;
        } else {
            return 'Customer does not exist';
        }
    }
}

export default Manager
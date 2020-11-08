class Hotel {
    constructor(rooms) {
        this.rooms = rooms;
        this.date = undefined;
    }

    getAvailableRooms(bookings) {
        const unavailableRooms = bookings.reduce((bookedRooms, booking) => {
            if (this.date === booking.date) {
                bookedRooms.unshift(booking.roomNumber);
            }
            return bookedRooms;
        }, []);
        const availableRooms = this.rooms.filter(room => {
            return !unavailableRooms.includes(room.number);
        })
        return availableRooms;
    }

    filterAvailableRoomsByType(bookings, roomType) {
        const emptyRooms = this.getAvailableRooms(bookings);
        const filteredRooms = emptyRooms.filter(room => {
            return room.roomType === roomType;
        })
        return filteredRooms;
    }
}

export { hotel }
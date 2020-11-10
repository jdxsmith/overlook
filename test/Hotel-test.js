import chai from 'chai';
const expect = chai.expect;
import Hotel from '../src/Hotel';

describe('Hotel', () => {
    let room1;
    let room2;
    let booking1;
    let booking2;
    let booking3;
    let booking4;
    let hotel;
    let allBookings;

    beforeEach(() => {
        room1 = {
            number: 15,
            roomType: "single room",
            bidet: true, 
            bedSize: "queen",
            numBeds: 2,
            costPerNight: 400
        };

        room2 = {
            number: 3,
            roomType: "residential suite",
            bidet: false,
            bedSize: "twin",
            numBeds: 2,
            costPerNight: 200
        };

        booking1 = {
            id: "befg783hd7e28fhi3e",
            userID: 21,
            date:"2020/12/30",
            roomNumber: 15,
            roomServiceCharges: []
        };

        booking2 = {
            id: "id7snwk3hti8ewn84h",
            userID: 13,
            date: "2021/01/18",
            roomNumber: 3,
            roomServiceCharges: []
        };

        booking3 = {
            id: "bsk3287fpwh79d5a9w",
            userID : 21,
            date: "2020/04/02",
            roomNumber: 3,
            roomServiceCharges: []
        };

        booking4 = {
            id: "ud8w3kf0sh543yxh2p",
            userID: 13,
            date: "2019/09/19",
            roomNumber: 15,
            roomServiceCharges: []
        };

        hotel = new Hotel([room1, room2]);

        allBookings = [booking1, booking2, booking3, booking4];
    })

    it('should be a function', () => {
        expect(Hotel).to.be.a('function');
    })
    
    it('should have rooms', () => {
        expect(hotel.rooms).to.deep.equal([room1, room2]);
    })

    it('should start without a date', () => {
        expect(hotel.date).to.equal(undefined);
    })

    it('should be able to have a date assigned', () => {
        hotel.date = "2020/07/30";
        expect(hotel.date).to.equal("2020/07/30");
    })

    it('should list available rooms for a specified date', () => {
        hotel.date = "2020/12/30";
        expect(hotel.getAvailableRooms(allBookings)).to.deep.equal([room2]);
    })

    it('should filter available rooms by type', () => {
        hotel.date = "2020/12/30";
        expect(hotel.filterAvailableRoomsByType(allBookings, 'residential suite')).to.deep.equal([room2]);
    })
})
import chai from 'chai';
const expect = chai.expect;
import Customer from '../src/Customer';
import Hotel from '../src/Hotel';

describe('Customer', () => {
    let customer1;
    let customer2;
    let room1;
    let room2;
    let hotel;
    let booking1;
    let booking2;
    let booking3;
    let booking4;
    let allBookings;

    beforeEach(() => {
        customer1 = new Customer("customer13", "Benjamin Ten");
        customer2 = new Customer("customer21", "Daniel Phantom");

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
        expect(Customer).to.be.a('function');
    })

    it('should have a name', () => {
        expect(customer1.name).to.equal("Benjamin Ten");
    })

    it('should have a password', () => {
        expect(customer1.password).to.equal("overlook2020");
    })

    it('should have an id', () => {
        expect(customer2.id).to.equal(21);
    })

    it('should have a date', () => {
        expect(customer1.date).to.equal(new Date().toISOString().split('T')[0]);
    })

    it('should welcome the customer upon successful login', () => {
        expect(customer1.confirmCustomerLogin('overlook2020')).to.equal('Welcome customer!');
    })

    it('should invalidate the customer upon unsuccessful login', () => {
        expect(customer1.confirmCustomerLogin('notoverlook2020')).to.equal('Incorrect username or password. Please try again.');
    })

    it('should start with no present bookings', () => {
        expect(customer1.presentBookings).to.deep.equal([]);
    })

    it('should start with no past bookings', () => {
        expect(customer1.pastBookings).to.deep.equal([]);
    })

    it('should start with no future bookings', () => {
        expect(customer1.futureBookings).to.deep.equal([]);
    })

    it('should start with an amount spent of 0', () => {
        expect(customer1.amountSpent).to.equal(0);
    })

    it('should be able to calculate amount spent for a customer', () => {
        customer1.calculateAmountSpent(hotel, allBookings);

        expect(customer1.amountSpent).to.equal(600);
    })

    it('should sort a customers booking history', () => {
        customer2.sortCustomerBookings(allBookings);

        expect(customer2.presentBookings).to.deep.equal([]);
        expect(customer2.pastBookings).to.deep.equal([booking3]);
        expect(customer2.futureBookings).to.deep.equal([booking1]);
    })
})
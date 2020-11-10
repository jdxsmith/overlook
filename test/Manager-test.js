import chai from 'chai';
const expect = chai.expect;
import Manager from '../src/Manager';
import Customer from '../src/Customer';
import Hotel from '../src/Hotel';

describe('Manager', () => {
  let manager;
  let customer1;
  let customer2;
  let room1;
  let room2;
  let customers;
  let hotel;
  let booking1;
  let booking2;
  let booking3;
  let booking4;
  let allBookings;

  beforeEach(() => {
    manager = new Manager("manager");

    customer1 = new Customer("customer13", "Benjamin Ten");
    customer2 = new Customer("customer21", "Daniel Phantom");

    customers = [customer1, customer2];

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
})

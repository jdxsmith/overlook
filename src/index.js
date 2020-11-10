import Customer from './Customer';
import Manager from './Manager';
import Hotel from './Hotel';
import { apiData } from './apiData'
import './css/base.scss';

let currentCustomer;
let currentManager;
let currentHotel;
let bookingData;
let userData;
let roomData;

const navBar = document.querySelector('nav');
const mainPage = document.querySelector('main');
const userLoginForm = document.querySelector('.user-login-form');

function instantiateAllData(users, rooms, bookings) {
    userData = users;
    currentHotel = new Hotel(rooms);
    bookingData = bookings;
}

function getAllData() {
    const users  = apiData.fetchUserData();
    const rooms = apiData.fetchRoomData();
    const bookings = apiData.fetchBookingData();
    Promise.all([users, rooms, bookings]).then(data => {
      instantiateAllData(data[0], data[1], data[2]);
    })
}
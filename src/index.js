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

window.addEventListener('load', getAllData);
userLoginForm.addEventListener('click', handleUserLogin);

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

function handleUserLogin(event) {
    const usernameInput = document.querySelector('.username-input');
    const passwordInput = document.querySelector('.password-input');
    if (event.target.className === 'login-btn' && usernameInput.value.includes('customer')) {
        createCustomer(usernameInput.value, passwordInput.value);
        clearLoginInputs(usernameInput, passwordInput);
    } else if (event.target.className === 'login-btn' && usernameInput.value.includes('manager')) {
        createManager(usernameInput.value, passwordInput.value);
        clearLoginInputs(usernameInput, passwordInput);
    } else if (event.target.className === 'login-btn') {
        displayUserLoginError();
    }
}

function createCustomer(enteredUsername, enteredPassword) {
    currentCustomer = new Customer(enteredUsername, enteredPassword);
    const targetedCustomer = userData.find(user => {
        return user.id === currentCustomer.id;
    })
    currentCustomer = new Customer(`customer${targetedCustomer.id}`, targetedCustomer.name);
    const validateCustomer = currentCustomer.confirmCustomerLogin(enteredPassword);
    clearUserLoginError();
    if (validateCustomer === 'Welcome customer!') {
        runCustomerMethods();
        displayCustomerPage();
    }
}

function runCustomerMethods() {
    currentCustomer.calculateAmountSpent(currentHotel, bookingData);
    currentCustomer.sortCustomerBookings(bookingData);
}

function displayCustomerPage() {
    clearPage();
    const customerNav =
    `<section class='customer-nav-bar'>
        <div class='customer-nav-bar-heading'>
            <h2 class='nav-text'>Welcome back, ${currentCustomer.name}</h2>
        </div>
        <div class='nav-bar-details'>
            <article class='nav-customer-booking'>
                <h3 class='nav-form-header nav-text'>Bookings</h3>
                <input aria-label='date-input' type='date' class='room-availability-input'>
                <button class='customer-nav-bar-btn room-availability-btn'>View Bookings</button>
            </article>
            <div class="nav-customer-data">
                <h4 class="nav-text">Amount Spent: $${currentCustomer.amountSpent}</h4>
            </div>
        </div>
    </section>`
    const pageHeader = `<h1 class="main-title">Your Bookings</h1>`;
    navBar.insertAdjacentHTML('afterbegin', customerNav);
    mainPage.insertAdjacentHTML('afterbegin', pageHeader);
    displayAllBookings(currentCustomer);
}

function createManager(enteredUsername, enteredPassword) {
    currentManager = new Manager(enteredUsername);
    const validateManager = currentManager.confirmManagerLogin(enteredPassword);
    clearUserLoginError();
    if (validateManager === 'Welcome manager!') {
        runManagerMethods();
        displayManagerPage();
    } else {
        displayUserLoginError();
    }
}

function runManagerMethods() {
    const todaysIncome = currentManager.calculateTodaysIncome(bookingData, currentHotel);
    const todaysOccupancy = currentManager.calculateTodaysOccupancy(bookingData, currentHotel.rooms.length);
    const availableRooms = currentHotel.getAvailableRooms(bookingData);
    clearPage();
    displayManagerPage(todaysIncome, todaysOccupancy, availableRooms);
}

function displayManagerPage(todaysIncome, todaysOccupancy, availableRooms) {
    const managerNav =
    `<section class="manager-nav-bar">
        <div class="manager-nav-bar-heading">
            <div class="manager-nav-title-block">
                <h2 class="nav-text">Welcome back, Manager</h1>
            </div>
            <div class="manager-nav-bar-info">
                <h3 class="manager-nav-bar-stats">Today's Total Income: $${todaysIncome}</h3>
                <h3 class="manager-nav-bar-stats">Current Occupancy: ${todaysOccupancy}</h3>
                <h3 class="manager-nav-bar-stats">Available Rooms: ${availableRooms.length}</h3>
            </div>
        </div>
    </section>`;
    const pageHeader = `<h1 class="main-title">Current Guests</h1>`;
    navBar.insertAdjacentHTML('afterbegin', managerNav);
    mainPage.insertAdjacentHTML('afterbegin', pageHeader);
}

function clearPage() {
    mainPage.innerHTML = "";
    navBar.innerHTML = "";
}

function displayUserLoginError() {
    const errorMessage =
    `<h4 class="login-error-message">Incorrect username or password. Please try again.</h4>`;
    userLoginForm.insertAdjacentHTML('beforeend', errorMessage);
}

function clearUserLoginError() {
    if (userLoginForm.children[4]) {
        userLoginForm.children[4].remove();
    }
}

function clearLoginInputs(usernameInput, passwordInput) {
    usernameInput.value = "";
    passwordInput.value = "";
}

function displayBookingsByType(bookingType, bookings, customerInfo) {
    const roomHistory = mainPage.lastChild.children[1];
    const bookingHTML =
      `<article class="booking-cards">
        <h2>${bookingType}</h2>
        <ul class="room-history">
        </ul>
      </article>`;
    mainPage.insertAdjacentHTML('beforeend', bookingHTML);
    displayListOfBookings(bookings, customerInfo);
}

function displayAllBookings(customerInfo) {
    const roomHistory = mainPage.lastChild.children[1];
    if (customerInfo.presentBookings.length > 0) {
      displayBookingsByType('Current Bookings', customerInfo.presentBookings, customerInfo);
    }
    if (customerInfo.futureBookings.length > 0) {
      displayBookingsByType('Future Bookings', customerInfo.futureBookings, customerInfo);
    }
    if (customerInfo.pastBookings.length > 0) {
      displayBookingsByType('Past Bookings', customerInfo.pastBookings, customerInfo);
    }
}

function displayListOfBookings(bookings) {
    const roomHistory = mainPage.lastChild.children[1];
    bookings.forEach(booking => {
      const bookingItem =
      `<li>Room ${booking.roomNumber} on ${booking.date}</li>`;
      roomHistory.insertAdjacentHTML('beforeend', bookingItem);
    })
}
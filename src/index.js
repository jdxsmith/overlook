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
navBar.addEventListener('click', handleNavActions);
// mainPage.addEventListener('click', handleMainPageActions);

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
        <div class="manager-nav-buttons">
            <article class="manager-customer-search">
                <h4 class="manager-nav-buttons-title">Search For Customers</h4>
                <input type="text" placeholder="Customer Name" aria-label="customer-name-input" class="manager-nav-input">
                <button class="manager-nav-btn search-customer-btn">Search Customer</button>
            </article>
            <article class="manager-date-form">
                <h4 class="manager-nav-buttons-title">Check Room Availability</h4>
                <input type="date" aria-label="date-input" class="manager-nav-input">
                <button class="manager-nav-btn date-availability-btn">Check Rooms</button>
            </article>
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

function handleNavActions(event) {
    if (event.target.classList.contains('room-availability-btn')) {
        displayAvailableRooms(event, currentCustomer.id);
    } else if (event.target.classList.contains('search-user-button')) {
        findGuestProfile(event);
    }
}
  
function displayAvailableRooms(event, customerID) {
    const dateInput = event.target.previousElementSibling;
    if (currentCustomer.date <= dateInput.value) {
      displayFilteredRooms(dateInput, event, customerID);
    }
}

function displayFilteredRooms(dateInput, event, customerID) {
    mainPage.innerHTML = '';
    const pageHeader = `<h1 class="main-title">Available Rooms on ${dateInput.value}</h1>`;
    mainPage.insertAdjacentHTML('afterbegin', pageHeader);
    displayRoomsForm(customerID);
    findOpenRooms(dateInput.value, customerID);
}

function displayRoomsForm(customerID) {
    const roomsForm =
    `<section class="rooms-form">
        <h2 class="rooms-form-title">Filter Rooms By Type</h2>
        <div class="rooms-form-inputs">
            <select name="room-types" id="room-types" class="room-type-options">
                <option value="single room">single room</option>
                <option value="junior suite">junior suite</option>
                <option value="suite">suite</option>
                <option value="residential suite">residential suite</option>
                <option value="all rooms">all rooms</option>
            </select>
            <button class="room-type-button">FILTER YOUR SEARCH</button>
        </div>
    </section>`;
    if (customerID !== 0) {
      mainPage.insertAdjacentHTML('beforeend', roomsForm);
    }
}

function findOpenRooms(selectedDate) {
    currentHotel.date = selectedDate.replace('-', '/').replace('-', '/');
    const availableRooms = currentHotel.getAvailableRooms(bookingData);
    displayOpenRooms(availableRooms);
}

function displayOpenRooms(availableRooms) {
    availableRooms.forEach(room => {
      const roomHTML =
      `<section class="available-room-cards">
        <h2 class="available-room-card-header">Room ${room.number}</h2>
        <ul class="available-room-list">
          <li class="available-room-list-item"><h3>${room.roomType}</h3></li>
          <li class="available-room-list-item">${room.numBeds} ${room.bedSize} size beds</li>
          <li class="available-room-list-item">Cost Per Night: $${room.costPerNight}</li>
          <li class="available-room-list-item">Bidet: ${room.bidet}</li>
        </ul>
        <button class="book-available-room-btn">Book Room</button>
      </section>`;
      mainPage.insertAdjacentHTML('beforeend', roomHTML);
    })
}
  
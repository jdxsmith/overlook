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

const mainPage = document.querySelector('main');
const navBar = document.querySelector('nav');
const userLoginForm = document.querySelector('.user-login-form');
const chai = require('chai');
const expect = chai.expect;
const spies = require('chai-spies');
chai.use(spies);
const apiData = require('../src/apiData');

describe('apiData', () => {
    before(() => {
        global.apiData = {};
        chai.spy.on(apiData, ['fetchUserData', 'fetchRoomData', 'fetchBookingData'], () => {})
    })

    it('should fetch the user data', () => {
        apiData.fetchUserData();
        expect(apiData.fetchUserData).to.have.been.called(1);
    })
  
    it('should fetch the room data', () => {
        apiData.fetchRoomData();
        expect(apiData.fetchRoomData).to.have.been.called(1);
    })

    it('should fetch the booking data', () => {
        apiData.fetchBookingData();
        expect(apiData.fetchBookingData).to.have.been.called(1);
    })
})

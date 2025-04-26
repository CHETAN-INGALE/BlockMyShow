import axios from "axios";
const API_BASE_URL = process.env.REACT_APP_SERVER_API;

const bookingAPI = {
    //Book Tickets
    bookTickets: async (bookingDetails) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/bookEventTickets/`, bookingDetails);
            console.log(bookingDetails);
            return response;
        } catch (error) {
            throw error.response ? error.response.data : error;
        }
    },
    //get Booking Details
    getBookingDetails: async (userDetails) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/getBookingDetails/`,userDetails);
            return response;
        } catch (error) {
            throw error.response ? error.response.data : error;
        }
    },

    //Verify Booking
    verifyBooking: async (bookingDetails) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/qrVerify/`, bookingDetails);
            return response;
        } catch (error) {
            throw error.response ? error.response.data : error;
        }
    },

};

export default bookingAPI;
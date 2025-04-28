import axios from "axios";
import { toast } from "react-toastify";
import movieAPI from "./movieApi";

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
            const response = await axios.post(`${API_BASE_URL}/getBookingDetails/`, userDetails);
    
            if (response.status === 200) {
                const bookingDetails = response.data;
    
                // Extract user ID
                const userId = bookingDetails._id;
    
                // Format the booking details
                const formattedBookings = Object.keys(bookingDetails)
                    .filter((key) => key !== "_id") // Exclude the `_id` field
                    .map((movieId) => ({
                        movieId: parseInt(movieId), // Convert movieId to a number
                        seats: bookingDetails[movieId], // Get the seats array
                    }));
    
                // Fetch movie details
                const moviesResponse = await movieAPI.getMovies(100); // Fetch all movies
                const movieDetailsMap = {};
                moviesResponse.data.forEach((movie) => {
                    movieDetailsMap[movie._id] = movie; // Map movie ID to movie details
                });
    
                // Map the formatted bookings to include movie details
                formattedBookings.forEach((booking) => {
                    const movieId = booking.movieId;
                    const movieDetails = movieDetailsMap[movieId];
                    if (movieDetails) {
                        booking.movieName = movieDetails.event_name; // Add movie name
                        booking.posterUrl = movieDetails.poster_url; // Add poster URL
                    }
                });    
                return {
                    userId: userId,
                    bookings: formattedBookings,
                };
            } else {
                toast.error("Error fetching booking details");
            }
        } catch (error) {
            toast.error("Error fetching booking details");
            return error;
        }
    },

    //Verify Booking
    verifyBooking: async (bookingDetails) => {
        try {
            bookingDetails=JSON.parse(bookingDetails);
            console.log("Booking Details", bookingDetails);
            bookingDetails = {
                userId: bookingDetails.userId,
                movieId: bookingDetails.movieId,
                seatsBooked: bookingDetails.seatsBooked.includes(",") 
                    ? bookingDetails.seatsBooked.split(",").map(Number) 
                    : [parseInt(bookingDetails.seatsBooked, 10)],
            };
            console.log("Booking Details", bookingDetails);
            const response = await axios.post(`${API_BASE_URL}/qrVerify/`, bookingDetails);

            return response;
        } catch (error) {
            throw error.response ? error.response.data : error;
        }
    },

};

export default bookingAPI;
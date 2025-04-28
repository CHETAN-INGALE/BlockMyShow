import axios from "axios";
const API_BASE_URL = process.env.REACT_APP_SERVER_API;

const movieAPI = {
    //Get All Movies
    getMovies: async (numberOfMovies) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/movieAiringNow/${numberOfMovies}`);
            //console.log(response)
            return response;

        } catch (error) {
            throw error.response ? error.response.data : error;
        }
    },

    //Get Movie By Name
    getMovieByName: async (movieName) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/movieByName/`,movieName);
            return response;
        } catch (error) {
            throw error.response ? error.response.data : error;
        }
    },
    
    //New Event
    newEvent: async (eventDetails) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/newEvent/`, eventDetails);
            return response;
        } catch (error) {
            throw error.response ? error.response.data : error;
        }
    },

};

export default movieAPI;
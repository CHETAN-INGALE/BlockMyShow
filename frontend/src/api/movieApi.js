import axios from "axios";
const API_BASE_URL = process.env.REACT_APP_SERVER_API;

const movieAPI = {
    getMovies: async (numberOfMovies) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/movieAiringNow/${numberOfMovies}`);
            //console.log(response)
            return response;

        } catch (error) {
            throw error.response ? error.response.data : error;
        }
    },

    getMovieById: async (movieId) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/movies/${movieId}/`);
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error;
        }
    },

    createMovie: async (movieData) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/movies/`, movieData);
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error;
        }
    },

    updateMovie: async (movieId, movieData) => {
        try {
            const response = await axios.put(`${API_BASE_URL}/movies/${movieId}/`, movieData);
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error;
        }
    },

    deleteMovie: async (movieId) => {
        try {
            const response = await axios.delete(`${API_BASE_URL}/movies/${movieId}/`);
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error;
        }
    },
};

export default movieAPI;
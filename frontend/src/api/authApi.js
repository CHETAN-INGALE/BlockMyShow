import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_SERVER_API;
const authAPI = {
    auth: async (userData) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/auth/`, userData);
            return response;
        } catch (error) {
            throw error.response ? error.response.data : error;
        }
    },

    login: async (credentials) => {
        try {
            console.log("Credentials",API_BASE_URL);
            const response = await axios.post(`${API_BASE_URL}/login/`, credentials);
            console.log("Email Link Send",response.data);
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error;
        }
    },

    logout: async () => {
        try {
            const response = await axios.post(`${API_BASE_URL}/auth/logout`);
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error;
        }
    },

    getUser: async (token) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/auth/user`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error;
        }
    },
    updateUser: async (userData) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/updateUserDetails/`, userData);
            return response;
        } catch (error) {
            throw error.response ? error.response.data : error;
        }
    },
};

export default authAPI;
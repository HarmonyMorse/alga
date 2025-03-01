import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const challengesApi = {
    // Get all challenges
    getAllChallenges: async () => {
        const response = await axios.get(`${API_URL}/api/challenges`);
        return response.data;
    },

    // Get a specific challenge by ID
    getChallenge: async (id) => {
        const response = await axios.get(`${API_URL}/api/challenges/${id}`);
        return response.data;
    },

    // Submit a solution
    submitSolution: async (id, code) => {
        const response = await axios.post(`${API_URL}/api/challenges/${id}/submit`, { code });
        return response.data;
    }
};

export default challengesApi; 
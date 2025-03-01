import axios from 'axios';



console.log(import.meta.env.VITE_API_URL);

// Create an Axios instance with custom config
const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api`, // This will be prepended to all requests
    timeout: 10000, // 10 seconds
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

// Request interceptor
api.interceptors.request.use(
    (config) => {
        // You can modify the request config here
        // For example, add auth tokens from localStorage
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
api.interceptors.response.use(
    (response) => {
        // Any status code within the range of 2xx
        return response;
    },
    (error) => {
        // Any status codes outside the range of 2xx
        console.error('API Error:', error.response?.data || error.message);

        // Handle specific error cases
        if (error.response?.status === 401) {
            // Handle unauthorized access
            // e.g., redirect to login page
            console.log('Unauthorized access');
        }

        return Promise.reject(error);
    }
);

// API service functions
const apiService = {
    // Health check
    checkHealth: () => api.get('/health'),

    // Auth endpoints
    login: (credentials) => api.post('/auth/login', credentials),
    signup: (userData) => api.post('/auth/signup', userData),
    logout: () => {
        localStorage.removeItem('token');
        return Promise.resolve();
    },

    // User profile
    getUserProfile: () => api.get('/auth/profile'),
    updateUserProfile: (userData) => api.put('/auth/profile', userData),

    // Add more API endpoints as needed
};

export default apiService; 
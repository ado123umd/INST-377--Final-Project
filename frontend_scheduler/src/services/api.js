import axios from 'axios';

// Base URL for the backend
const api = axios.create({
    baseURL: 'http://localhost:5000/api'
})


export default api;

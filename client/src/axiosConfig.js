// axiosConfig.js
import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8000',
    withCredentials: true, // ✅ send cookies & headers like token
});

export default instance;

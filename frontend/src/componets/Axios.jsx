// src/api.js
import axios from 'axios';


const baseURL = 'http://localhost:8000';

const AxiosInstance = axios.create({
    baseURL: baseURL, // Cambia si tu backend tiene otro puerto o dominio
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
});

export default AxiosInstance;

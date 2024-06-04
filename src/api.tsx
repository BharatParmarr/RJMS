import axios from 'axios';
import API_HOST from './config';

const api = axios.create({
    baseURL: API_HOST + '/api/hostel/',
    headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
    },
});

export default api;

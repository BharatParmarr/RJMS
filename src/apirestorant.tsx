import axios from 'axios';
import API_HOST from './config';

const api2 = axios.create({
    baseURL: API_HOST + '/api/restorant/',
    headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
    },
});

export default api2;

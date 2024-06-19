import axios from 'axios';
import API_HOST from './config';

const service_api = axios.create({
    baseURL: API_HOST + '/api/service-shop/',
    headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
    },
});

export default service_api;

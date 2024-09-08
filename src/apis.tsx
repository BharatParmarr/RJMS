import axios from 'axios';
import API_HOST from './config';

const apis = axios.create({
    baseURL: API_HOST + '/api/req',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${localStorage.getItem("token")}`,
    },
});

const apis2 = axios.create({
    baseURL: API_HOST + '/api2/req',
    headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
    },
});

const Education_apis = axios.create({
    baseURL: API_HOST + '/api3/req',
    headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
    },
});

export { apis, apis2, Education_apis };


export default apis;

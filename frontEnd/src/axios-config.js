import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://10.59.180.112:5000/'
});

export default instance;
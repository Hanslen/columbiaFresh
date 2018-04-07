import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://160.39.201.136:5000/'
});

export default instance;
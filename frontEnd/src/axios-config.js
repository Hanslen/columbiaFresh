import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://160.39.200.173:5000/'
});

export default instance;
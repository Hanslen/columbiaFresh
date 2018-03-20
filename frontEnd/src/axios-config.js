import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://160.39.199.223:5000/'
});

export default instance;
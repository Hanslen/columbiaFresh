import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://160.39.198.131:8111/'
});

export default instance;
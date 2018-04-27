import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://0.0.0.0:5000'
    // baseURL: 'http://columbiafresh-dev.us-east-1.elasticbeanstalk.com/'
});

export default instance;
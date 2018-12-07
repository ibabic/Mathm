import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://mathmind-b6baf.firebaseio.com/'
});

export default instance;
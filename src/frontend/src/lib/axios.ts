import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://develop.snowball.live',
});

export default axiosClient;

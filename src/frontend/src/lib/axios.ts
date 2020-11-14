import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://15.165.131.230',
});

export default axiosClient;

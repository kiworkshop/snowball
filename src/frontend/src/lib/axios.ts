import axios from 'axios';

// const baseURL =
//   process.env.NODE_ENV === 'production'
//     ? 'http://develop.snowball.live'
//     : 'http://localhost:8080';

const axiosClient = axios.create({
  baseURL: 'http://localhost:8080',
});

export default axiosClient;
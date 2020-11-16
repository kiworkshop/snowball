import axios from 'axios';

// const baseURL =
//   process.env.NODE_ENV === 'production'
//     ? 'http://develop.snowball.live'
//     : 'http://localhost:8080';

const axiosClient = axios.create({
  baseURL: 'http://develop.snowball.live',
});

export default axiosClient;

import axios from 'axios';

const axiosClient = axios.create({
  baseURL: '/api',
});

export const getMe = () => {
  return axiosClient.get('/me');
};

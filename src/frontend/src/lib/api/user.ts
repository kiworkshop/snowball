import axios from 'axios';
import { Profile } from '../../features/user/type';

const axiosClient = axios.create({
  // baseURL: 'http://develop.snowball.live/api',
  baseURL: 'http://localhost:8080/api',
});

export const getMe = () => {
  return axiosClient.get<Profile>('/me');
};

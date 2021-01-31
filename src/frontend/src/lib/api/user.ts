import axios from 'axios';
import { Profile } from '../../store/modules/user';

const axiosClient = axios.create({
  // baseURL: 'http://develop.snowball.live/api',
  baseURL: 'http://localhost:8080/api'
});

export const getMe = () => {
  return axiosClient.get<Profile>('/me');
};

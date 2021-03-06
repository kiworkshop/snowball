import axios from 'axios';
import { UserResponse } from '../../types/response/user';

const axiosClient = axios.create({
  baseURL: '/api',
});

export const getMe = () => {
  return axiosClient.get<UserResponse.GetMe>('/me');
};

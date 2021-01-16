import axiosClient from '../axiosClient';
import { Profile } from '../../store/modules/user';

export const getMe = () => axiosClient.get<Profile>('/me');

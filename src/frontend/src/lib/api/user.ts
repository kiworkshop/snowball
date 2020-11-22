import axiosClient from '../axiosClient';
import { Profile } from '../../store/modules/user';

export const login = () => axiosClient.get<Profile>('/login');

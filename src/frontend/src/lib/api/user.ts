import axios from '../axios';
import { Profile } from '../../store/modules/user';

export const login = () => axios.get<Profile>('/login');

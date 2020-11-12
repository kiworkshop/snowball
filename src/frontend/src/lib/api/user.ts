import axios from '../axios';
import { User } from '../../type/user';

export const login = () => axios.get<User.Info>('/login');

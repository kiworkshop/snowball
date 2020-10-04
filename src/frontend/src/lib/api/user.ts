import axios from '../axios';

export const login = async () => {
  try {
    const user = await axios.get('/login');
    return user;
  } catch (error) {
    console.error(error);
  }
};

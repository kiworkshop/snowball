import { useQuery } from 'react-query';
import axios from 'axios';

const getNotes = async (size: number, page: number) => {
  const { data } = await axios.get(`/api/notes?size=${size}&page=${page}`);
  return data;
};

export default (size: number, page: number) => {
  return useQuery(['notes', size, page], () => getNotes(size, page));
};

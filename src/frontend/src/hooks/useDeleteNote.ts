import { useMutation } from 'react-query';
import axios from 'axios';

const deleteNote = (id: number) => {
  return axios.delete(`/api/notes/${id}`);
};

export default () => {
  return useMutation((id: number) => deleteNote(id));
};

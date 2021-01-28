import axios from 'axios';
import { $Note } from '../../types/note';

const axiosClient = axios.create({
  baseURL: 'http://develop.snowball.live/api/notes',
});

export const getNotes = (size: number, page: number) => {
  return axiosClient.get<$Note.Notes>(`?size=${size}&page=${page}`);
};

export const getNote = (id: number) => {
  return axiosClient.get<$Note.Note>(`/${id}`);
};

export const createNote = (form: $Note.Form) => {
  return axiosClient.post<{ id: number }>('', form);
};

export const updateNote = (id: number, form: $Note.Form) => {
  return axiosClient.put(`/${id}`, form);
};

export const deleteNote = (id: number) => {
  return axiosClient.delete(`/${id}`);
};

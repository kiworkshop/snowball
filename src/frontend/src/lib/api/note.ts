import axios from 'axios';
import { $Note } from '../../types/note';

const axiosClient = axios.create({
  baseURL: 'http://develop.snowball.live/notes',
});

export const getNotes = (size: number, page: number) =>
  axiosClient.get<$Note.Notes>(`?size=${size}&page=${page}`);

export const getNote = (id: number) => axiosClient.get<$Note.Note>(`/${id}`);

export const createNote = (form: $Note.Form) =>
  axiosClient.post<{ id: number }>('', form);

export const updateNote = (id: number, form: $Note.Form) =>
  axiosClient.put(`/${id}`, form);

export const deleteNote = (id: number) => axiosClient.delete(`/${id}`);

import axios from '../axios';
import { Note } from '../../type/note';

export const getNotes = (page: number) =>
  axios.get<Array<Note.APIResponse>>(`/notes?page=${page}`);

export const getNote = (id: string) =>
  axios.get<Note.APIResponse>(`/notes/${id}`);

export const createNote = (form: Note.Form) =>
  axios.post<Note.APIResponseOnlyWithId>('/notes', form);

export const updateNote = (id: string, form: Note.Form) =>
  axios.put(`/notes/${id}`, form);

export const deleteNote = (id: string) => axios.delete(`/notes/${id}`);

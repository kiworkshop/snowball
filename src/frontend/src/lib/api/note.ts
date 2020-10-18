import axios from '../axios';
import { NoteType } from '../../type/note';

export const getNotes = (page: number) => axios.get(`/notes?page=${page}`);
export const getNote = (id: string) => axios.get(`/notes/${id}`);
export const addNote = (form: NoteType.NoteForm) => axios.post('/notes', form);
export const updateNote = (id: string, form: NoteType.NoteForm) =>
  axios.put(`/notes/${id}`, form);

import axios from '../axios';

import { Note } from '../../type/note';
import { NoteAPIResponse } from '../../type/api';

export const getNotes = (size: number, page: number) =>
  axios.get<NoteAPIResponse.Notes>(`/notes?size=${size}&page=${page}`);

export const getNote = (id: string) =>
  axios.get<NoteAPIResponse.Note>(`/notes/${id}`);

export const createNote = (form: Note.Form) =>
  axios.post<NoteAPIResponse.OnlyWithId>('/notes', form);

export const updateNote = (id: string, form: Note.Form) =>
  axios.put(`/notes/${id}`, form);

export const deleteNote = (id: string) => axios.delete(`/notes/${id}`);

import axios from 'axios';
import { NoteRequest } from '../../types/request/note';
import { NoteResponse } from '../../types/response/note';

const axiosClient = axios.create({
  baseURL: '/api/notes',
});

export const getNotes = (size: NoteRequest.GetNotes.size, page: NoteRequest.GetNotes.page) => {
  return axiosClient.get<NoteResponse.getMultiple>(`?size=${size}&page=${page}`);
};

export const getNote = (id: NoteRequest.GetNote.id) => {
  return axiosClient.get<NoteResponse.getSingle>(`/${id}`);
};

export const createNote = (form: NoteRequest.Create.Form) => {
  return axiosClient.post<NoteResponse.create>('', form);
};

export const updateNote = (id: NoteRequest.Update.id, form: NoteRequest.Update.Form) => {
  return axiosClient.put(`/${id}`, form);
};

export const deleteNote = (id: NoteRequest.Delete.id) => {
  return axiosClient.delete(`/${id}`);
};

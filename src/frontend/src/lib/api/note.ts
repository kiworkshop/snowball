import axios from 'axios';
import { CreateNoteRequest, UpdateNoteRequest } from '../../types/request/note';
import {
  CreateNoteResponse,
  GetNoteResponse,
  GetNotesResponse,
} from '../../types/response/note';

const axiosClient = axios.create({
  baseURL: 'http://develop.snowball.live/api/notes',
  // baseURL: 'http://localhost:8080/api/notes'
});

export const getNotes = (size: number, page: number) => {
  return axiosClient.get<GetNotesResponse>(`?size=${size}&page=${page}`);
};

export const getNote = (id: number) => {
  return axiosClient.get<GetNoteResponse>(`/${id}`);
};

export const createNote = (form: CreateNoteRequest) => {
  return axiosClient.post<CreateNoteResponse>('', form);
};

export const updateNote = (id: number, form: UpdateNoteRequest) => {
  return axiosClient.put(`/${id}`, form);
};

export const deleteNote = (id: number) => {
  return axiosClient.delete(`/${id}`);
};

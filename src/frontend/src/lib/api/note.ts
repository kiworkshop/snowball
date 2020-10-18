import axios from '../axios';
import { NoteType } from '../../type/note';

export const getNotes = (page: number) => axios.get(`/notes?page=${page}`);

export const addNote = (form: NoteType.NoteForm) => axios.post('/notes', form);

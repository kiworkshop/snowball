import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useFailure, useRequest } from '../../hooks/store';
import { parseNote } from '../../lib/note';
import {
  NoteState,
  GetNotesRequestPayload,
  GetNotesSuccessPayload,
  GetNoteSuccessPayload,
  CreateNoteRequestPayload,
  UpdateNoteRequestPayload,
} from './type';

const initialState: NoteState = {
  note: {},
  notes: [],
  loading: {},
  error: {},
};

const request = useRequest<NoteState>();
const failure = useFailure<NoteState>();

const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {
    /**
     * request
     */
    getNotesRequest: request<GetNotesRequestPayload>('getNotes'),
    getNoteRequest: request<number>('getNote'),
    createNoteRequest: request<CreateNoteRequestPayload>('createNote'),
    updateNoteRequest: request<UpdateNoteRequestPayload>('updateNote'),
    deleteNoteRequest: request<number>('deleteNote'),

    /**
     * failure
     */
    getNotesFailure: failure('getNotes'),
    getNoteFailure: failure('getNote'),
    createNoteFailure: failure('createNote'),
    updateNoteFailure: failure('updateNote'),
    deleteNoteFailure: failure('deleteNote'),

    /**
     * success
     */
    getNotesSuccess: (state, action: PayloadAction<GetNotesSuccessPayload>) => {
      state.notes = action.payload.content.map(parseNote);
      state.loading.getNotes = false;
      state.error.getNotes = null;
    },
    getNoteSuccess: (state, action: PayloadAction<GetNoteSuccessPayload>) => {
      state.note[action.payload.id] = parseNote(action.payload);
      state.loading.getNote = false;
      state.error.getNote = null;
    },
    createNoteSuccess: (state) => {
      state.loading.createNote = false;
      state.error.createNote = null;
    },
    updateNoteSuccess: (state) => {
      state.loading.updateNote = false;
      state.error.updateNote = null;
    },
    deleteNoteSuccess: (state) => {
      state.loading.deleteNote = false;
      state.error.deleteNote = null;
    },
  },
});

export default noteSlice;

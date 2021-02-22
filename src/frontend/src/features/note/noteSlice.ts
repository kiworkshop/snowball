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

const noteRequest = useRequest<NoteState>();
const noteFailure = useFailure<NoteState>();

export const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {
    /**
     * request
     */
    getNotesRequest: noteRequest<GetNotesRequestPayload>('getNotes'),
    getNoteRequest: noteRequest<number>('getNote'),
    createNoteRequest: noteRequest<CreateNoteRequestPayload>('createNote'),
    updateNoteRequest: noteRequest<UpdateNoteRequestPayload>('updateNote'),
    deleteNoteRequest: noteRequest<number>('deleteNote'),

    /**
     * failure
     */
    getNotesFailure: noteFailure('getNotes'),
    getNoteFailure: noteFailure('getNote'),
    createNoteFailure: noteFailure('createNote'),
    updateNoteFailure: noteFailure('updateNote'),
    deleteNoteFailure: noteFailure('deleteNote'),

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

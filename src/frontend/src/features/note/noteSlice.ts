import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useFailure, useRequest } from '../../hooks/store';
import { parseNote } from '../../lib/note';
import { NoteState, NotePayload } from '../../types/store/note';

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
    getNotesRequest: request<NotePayload.GetNotes.Request>('getNotes'),
    getNoteRequest: request<NotePayload.GetNote.Request>('getNote'),
    createNoteRequest: request<NotePayload.CreateNote.Request>('createNote'),
    updateNoteRequest: request<NotePayload.UpdateNote.Request>('updateNote'),
    deleteNoteRequest: request<NotePayload.DeleteNote.Request>('deleteNote'),

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
    getNotesSuccess: (state, action: PayloadAction<NotePayload.GetNotes.Success>) => {
      state.notes = action.payload.content.map(parseNote);
      state.loading.getNotes = false;
      state.error.getNotes = null;
    },
    getNoteSuccess: (state, action: PayloadAction<NotePayload.GetNote.Success>) => {
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

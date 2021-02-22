import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { noteSlice } from './noteSlice';
import * as NoteAPI from '../../lib/api/note';
import * as history from '../../lib/history';
import errorHandler from '../../lib/error';
import routes from '../../routes';
import {
  CreateNoteRequestPayload,
  GetNotesRequestPayload,
  UpdateNoteRequestPayload,
} from './type';

const actions = noteSlice.actions;

function* getNotesSaga(action: PayloadAction<GetNotesRequestPayload>) {
  try {
    const { size, page } = action.payload;
    const response = yield call(NoteAPI.getNotes, size, page);
    yield put(actions.getNotesSuccess(response.data));
  } catch (e) {
    errorHandler(e);
    yield put(actions.getNotesFailure(e));
  }
}

function* getNoteSaga(action: PayloadAction<number>) {
  try {
    const response = yield call(NoteAPI.getNote, action.payload);
    yield put(actions.getNoteSuccess(response.data));
  } catch (e) {
    errorHandler(e);
    yield put(actions.getNoteFailure(e));
  }
}

function* createNoteSaga(action: PayloadAction<CreateNoteRequestPayload>) {
  try {
    const response = yield call(NoteAPI.createNote, action.payload);
    yield put(actions.createNoteSuccess());
    yield history.push(routes.note.detail(response.data.id));
  } catch (e) {
    errorHandler(e);
    yield put(actions.createNoteFailure(e));
  }
}

function* updateNoteSaga(action: PayloadAction<UpdateNoteRequestPayload>) {
  try {
    const { id, form } = action.payload;
    yield call(NoteAPI.updateNote, id, form);
    yield put(actions.updateNoteSuccess());
    yield history.push(routes.note.detail(id));
  } catch (e) {
    errorHandler(e);
    yield put(actions.updateNoteFailure(e));
  }
}

function* deleteNoteSaga(action: PayloadAction<number>) {
  try {
    yield call(NoteAPI.deleteNote, action.payload);
    yield put(actions.deleteNoteSuccess());
  } catch (e) {
    errorHandler(e);
    yield put(actions.deleteNoteFailure(e));
  }
}

export function* noteSaga() {
  yield takeEvery(actions.getNotesRequest, getNotesSaga);
  yield takeEvery(actions.getNoteRequest, getNoteSaga);
  yield takeLatest(actions.createNoteRequest, createNoteSaga);
  yield takeLatest(actions.updateNoteRequest, updateNoteSaga);
  yield takeLatest(actions.deleteNoteRequest, deleteNoteSaga);
}

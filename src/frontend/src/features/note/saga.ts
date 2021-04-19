import { call, put, takeEvery, takeLatest, select } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { useNoteAction } from '../../hooks';
import { noteSelector } from '../../lib/selector';
import * as NoteAPI from '../../lib/api/note';
import * as Type from '../../types';

const noteAction = useNoteAction();

function* getNotesSaga(action: PayloadAction<{ page: number; size: number }>) {
  try {
    const { size, page } = action.payload;
    const response: AxiosResponse = yield call(NoteAPI.getNotes, size, page);
    yield put(noteAction.getNotesSuccess(response.data));
  } catch (e) {
    yield put(noteAction.getNotesFailure(e));
  }
}

function* getNoteSaga(action: PayloadAction<number>) {
  try {
    const { note: noteEntity } = yield select(noteSelector);
    const cachedNote = noteEntity[action.payload];

    if (cachedNote) {
      yield put(noteAction.getNoteSuccess(cachedNote));
    } else {
      const response: AxiosResponse = yield call(NoteAPI.getNote, action.payload);
      yield put(noteAction.getNoteSuccess(response.data));
    }
  } catch (e) {
    yield put(noteAction.getNoteFailure(e));
  }
}

function* createNoteSaga(action: PayloadAction<Type.NoteForm>) {
  try {
    const response: AxiosResponse = yield call(NoteAPI.createNote, action.payload);
    yield put(noteAction.createNoteSuccess(response.data.id));
  } catch (e) {
    yield put(noteAction.createNoteFailure(e));
  }
}

function* updateNoteSaga(action: PayloadAction<{ id: number; form: Type.NoteForm }>) {
  try {
    const { id, form } = action.payload;
    yield call(NoteAPI.updateNote, id, form);
    const { data: updatedNote } = yield call(NoteAPI.getNote, id);
    yield put(noteAction.updateNoteSuccess(updatedNote));
  } catch (e) {
    yield put(noteAction.updateNoteFailure(e));
  }
}

function* deleteNoteSaga(action: PayloadAction<number>) {
  try {
    yield call(NoteAPI.deleteNote, action.payload);
    yield put(noteAction.deleteNoteSuccess());
  } catch (e) {
    yield put(noteAction.deleteNoteFailure(e));
  }
}

export function* noteSaga() {
  yield takeEvery(noteAction.getNotesRequest, getNotesSaga);
  yield takeEvery(noteAction.getNoteRequest, getNoteSaga);
  yield takeLatest(noteAction.createNoteRequest, createNoteSaga);
  yield takeLatest(noteAction.updateNoteRequest, updateNoteSaga);
  yield takeLatest(noteAction.deleteNoteRequest, deleteNoteSaga);
}

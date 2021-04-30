import { call, put, takeEvery, takeLatest, select } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { useNoteAction } from '../../hooks';
import { noteSelector } from '../../lib/selector';
import * as NoteAPI from '../../lib/api/note';
import * as Type from '../../types';
import { message } from 'antd';

const noteAction = useNoteAction();

function* getNotesSaga(action: PayloadAction<{ page: number; size: number }>) {
  try {
    const { page, size } = action.payload;
    const response: AxiosResponse = yield call(NoteAPI.getNotes, size, page - 1);

    if (response.data && response.data.content && response.data.content.length === 0 && page !== 1) {
      yield put(noteAction.setPage(page - 1));
    } else {
      yield put(noteAction.getNotesSuccess(response.data));
    }
  } catch (e) {
    yield put(noteAction.getNotesFailure(e));
  }
}

function* setPageSaga(action: PayloadAction<number>) {
  const {
    notes: { pageSize },
  } = yield select(noteSelector);
  yield put(noteAction.getNotesRequest({ page: action.payload, size: pageSize }));
}

function* setSizeSaga(action: PayloadAction<number>) {
  const {
    notes: { currentPage },
  } = yield select(noteSelector);
  yield put(noteAction.getNotesRequest({ page: currentPage, size: action.payload }));
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

function* deleteNoteFromListSaga(action: PayloadAction<number>) {
  try {
    yield call(NoteAPI.deleteNote, action.payload);
    yield put(noteAction.deleteNoteSuccess());
    const {
      notes: { currentPage, pageSize },
    } = yield select(noteSelector);
    yield put(noteAction.getNotesRequest({ page: currentPage, size: pageSize }));
    message.success('성공적으로 삭제되었습니다.');
  } catch (e) {
    yield put(noteAction.deleteNoteFailure(e));
  }
}

export function* noteSaga() {
  yield takeEvery(noteAction.getNotesRequest, getNotesSaga);
  yield takeEvery(noteAction.setPage, setPageSaga);
  yield takeEvery(noteAction.setSize, setSizeSaga);
  yield takeEvery(noteAction.getNoteRequest, getNoteSaga);
  yield takeLatest(noteAction.createNoteRequest, createNoteSaga);
  yield takeLatest(noteAction.updateNoteRequest, updateNoteSaga);
  yield takeLatest(noteAction.deleteNoteRequest, deleteNoteSaga);
  yield takeLatest(noteAction.deleteNoteFromListRequest, deleteNoteFromListSaga);
}

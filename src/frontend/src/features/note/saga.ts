import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { Modal } from 'antd';
import noteSlice from './noteSlice';
import * as NoteAPI from '../../lib/api/note';
import history from '../../lib/history';
import errorHandler from '../../lib/error';
import routes from '../../routes';

const actions = noteSlice.actions;

function* getNotesSaga(
  action: PayloadAction<{
    page: number;
    size: number;
  }>
) {
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

function* createNoteSaga(
  action: PayloadAction<{
    title: string;
    content: string;
    investmentDate: string;
    stockTransactions: Array<{
      stockDetailId: number;
      quantity: number;
      tradedPrice: number;
      transactionType: 'BUY' | 'SELL';
    }>;
  }>
) {
  try {
    const response = yield call(NoteAPI.createNote, action.payload);
    yield put(actions.createNoteSuccess());
    yield setTimeout(() => {
      history.push(routes.note.detail(response.data.id));
    }, 0);
  } catch (e) {
    errorHandler(e);
    yield put(actions.createNoteFailure(e));
  }
}

function* updateNoteSaga(
  action: PayloadAction<{
    id: number;
    form: {
      title: string;
      content: string;
      investmentDate: string;
      stockTransactions: Array<{
        stockDetailId: number;
        quantity: number;
        tradedPrice: number;
        transactionType: 'BUY' | 'SELL';
      }>;
    };
  }>
) {
  try {
    const { id, form } = action.payload;
    yield call(NoteAPI.updateNote, id, form);
    const { data: updatedNote } = yield call(NoteAPI.getNote, id);
    yield put(actions.updateNoteSuccess(updatedNote));
    yield setTimeout(() => {
      history.push(routes.note.detail(id));
    }, 0);
  } catch (e) {
    errorHandler(e);
    yield put(actions.updateNoteFailure(e));
  }
}

function* deleteNoteSaga(action: PayloadAction<number>) {
  try {
    yield call(NoteAPI.deleteNote, action.payload);
    yield put(actions.deleteNoteSuccess());
    yield Modal.success({
      content: '노트가 삭제되었습니다.',
      onOk: () => {
        window.location.replace(routes.home);
      },
    });
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

import moment from 'moment';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import * as history from '../../../lib/history';
import * as noteAPI from '../../../lib/api/note';
import {
  GET_NOTES_REQUEST,
  GET_NOTE_REQUEST,
  CREATE_NOTE_REQUEST,
  SET_FORM_FOR_UPDATE_REQUEST,
  UPDATE_NOTE_REQUEST,
  DELETE_NOTE_REQUEST,
  getNoteAsync,
  createNoteAsync,
  setFormForUpdateAsync,
  updateNoteAsync,
  deleteNoteAsync,
  getNotesAsync,
  setForm,
} from './actions';
import { Note } from '../../../lib/api/note';
import routes from '../../../routes';

function* getNotesSaga(action: ReturnType<typeof getNotesAsync.request>) {
  try {
    const { size, page } = action.payload;
    const response = yield call(noteAPI.getNotes, size, page);
    yield put(getNotesAsync.success(response.data));
  } catch (e) {
    yield put(getNotesAsync.failure(e));
  }
}

function* getNoteSaga(action: ReturnType<typeof getNoteAsync.request>) {
  try {
    const response = yield call(noteAPI.getNote, action.payload);
    yield put(getNoteAsync.success(response.data));
  } catch (e) {
    yield put(getNoteAsync.failure(e));
  }
}

function* createNoteSaga(action: ReturnType<typeof createNoteAsync.request>) {
  try {
    const form = action.payload;

    if (!form.title) {
      form.title = `${form.investmentDate?.format('YYYY-MM-DD')} 투자노트`;
    }

    const response = yield call(noteAPI.createNote, form);
    yield put(createNoteAsync.success());
    history.push(routes.note.detail(response.data.id));
  } catch (e) {
    yield put(createNoteAsync.failure(e));
  }
}

function* setFormForUpdateSaga(
  action: ReturnType<typeof setFormForUpdateAsync.request>
) {
  try {
    const response = yield call(noteAPI.getNote, action.payload);
    const note: Note = response.data;
    yield put(
      setForm({
        content: note.content,
        investmentDate: moment(note.investmentDate),
        stockTransactions: note.stockTransactions.map((stockTransaction) => ({
          companyName: stockTransaction.stockDetail.companyName,
          transactionType: stockTransaction.transactionType,
          quantity: stockTransaction.quantity,
          tradedPrice: stockTransaction.tradedPrice,
          user: null,
          note: null,
          stockDetail: {
            id: stockTransaction.stockDetail.id,
          },
        })),
      })
    );
    yield put(setFormForUpdateAsync.success());
  } catch (e) {
    yield put(setFormForUpdateAsync.failure(e));
  }
}

function* updateNoteSaga(action: ReturnType<typeof updateNoteAsync.request>) {
  try {
    const { id, form } = action.payload;

    if (!form.title) {
      form.title = `${form.investmentDate?.format('YYYY-MM-DD')} 투자노트`;
    }

    yield call(noteAPI.updateNote, id, form);
    yield put(updateNoteAsync.success());
    history.push(routes.note.detail(id));
  } catch (e) {
    yield put(updateNoteAsync.failure(e));
  }
}

function* deleteNoteSaga(action: ReturnType<typeof deleteNoteAsync.request>) {
  try {
    yield call(noteAPI.deleteNote, action.payload);
    yield put(deleteNoteAsync.success());
  } catch (e) {
    yield put(deleteNoteAsync.failure(e));
  }
}

export function* noteSaga() {
  yield takeEvery(GET_NOTES_REQUEST, getNotesSaga);
  yield takeEvery(GET_NOTE_REQUEST, getNoteSaga);
  yield takeLatest(CREATE_NOTE_REQUEST, createNoteSaga);
  yield takeEvery(SET_FORM_FOR_UPDATE_REQUEST, setFormForUpdateSaga);
  yield takeLatest(UPDATE_NOTE_REQUEST, updateNoteSaga);
  yield takeLatest(DELETE_NOTE_REQUEST, deleteNoteSaga);
}

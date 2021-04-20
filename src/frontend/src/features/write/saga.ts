import { put, takeEvery } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { useNoteAction, useWriteAction } from '../../hooks';
import * as Type from '../../types';

const writeAction = useWriteAction();
const noteAction = useNoteAction();

function* writingSucceededSaga(action: PayloadAction<number | Type.Note>) {
  const payload = action.payload;
  yield put(writeAction.success(typeof payload === 'number' ? payload : payload.id));
}

export function* writeSaga() {
  yield takeEvery([noteAction.createNoteSuccess, noteAction.updateNoteSuccess], writingSucceededSaga);
}

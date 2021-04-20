import { takeEvery } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { useWriteAction } from '../../hooks';
import history from '../../lib/history';
import routes from '../../routes';

const writeAction = useWriteAction();

function* writingSucceededSaga(action: PayloadAction<number>) {
  yield setTimeout(() => {
    history.push(routes.note.detail(action.payload));
  }, 0);
}

export function* historySaga() {
  yield takeEvery(writeAction.success, writingSucceededSaga);
}

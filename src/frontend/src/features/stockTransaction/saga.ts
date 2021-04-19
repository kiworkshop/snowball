import { put, takeEvery } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { useNoteAction, useStockTransactionAction } from '../../hooks';
import * as Type from '../../types';

const stockTransactionAction = useStockTransactionAction();
const noteAction = useNoteAction();

function* getStockTransactionOfNoteSaga(action: PayloadAction<Type.Note>) {
  yield put(stockTransactionAction.getStockTransactionsOfNote(action.payload.stockTransactions));
}

export function* stockTransactionSaga() {
  yield takeEvery(noteAction.getNoteSuccess, getStockTransactionOfNoteSaga);
}

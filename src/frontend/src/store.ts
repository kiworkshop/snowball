import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import noteSlice, { noteSaga } from './features/note';
import portfolioSlice, { portfolioSaga } from './features/portfolio';
import userSlice, { userSaga } from './features/user';
import stockTransactionSlice, { stockTransactionSaga } from './features/stockTransaction';
import writeSlice, { writeSaga } from './features/write';
import { historySaga } from './features/history';

const sagaMiddleware = createSagaMiddleware();

export const runSaga = sagaMiddleware.run;
export const store = configureStore({
  reducer: {
    note: noteSlice.reducer,
    write: writeSlice.reducer,
    portfolio: portfolioSlice.reducer,
    stockTransaction: stockTransactionSlice.reducer,
    user: userSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export function* rootSaga() {
  yield all([noteSaga(), portfolioSaga(), userSaga(), stockTransactionSaga(), writeSaga(), historySaga()]);
}

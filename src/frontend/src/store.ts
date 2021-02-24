import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { applyMiddleware, compose } from 'redux';
import { all } from 'redux-saga/effects';
import DevTools from './container/DevTools';
import noteSlice, { noteSaga } from './features/note';
import portfolioSlice, { portfolioSaga } from './features/portfolio';
import stockTransactionSlice from './features/stockTransaction';

const sagaMiddleware = createSagaMiddleware();
const enhancer =
  process.env.NODE_ENV === 'production'
    ? compose(applyMiddleware(sagaMiddleware))
    : compose(applyMiddleware(sagaMiddleware), DevTools.instrument());

export const runSaga = sagaMiddleware.run;
export const store = configureStore({
  reducer: {
    note: noteSlice.reducer,
    portfolio: portfolioSlice.reducer,
    stockTransaction: stockTransactionSlice.reducer,
  },
  enhancers: [enhancer],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export function* rootSaga() {
  yield all([noteSaga(), portfolioSaga()]);
}

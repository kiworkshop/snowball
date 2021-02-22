import { configureStore } from '@reduxjs/toolkit';
import { noteSlice } from './features/note/noteSlice';
import createSagaMiddleware from 'redux-saga';
import { applyMiddleware, compose } from 'redux';
import DevTools from './container/DevTools';

const sagaMiddleware = createSagaMiddleware();
const enhancer =
  process.env.NODE_ENV === 'production'
    ? compose(applyMiddleware(sagaMiddleware))
    : compose(applyMiddleware(sagaMiddleware), DevTools.instrument());

const store = configureStore({
  reducer: {
    note: noteSlice.reducer,
  },
  enhancers: [enhancer],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

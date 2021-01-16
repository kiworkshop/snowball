import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './modules';
import DevTools from '../container/DevTools';

const sagaMiddleware = createSagaMiddleware();

const enhancer =
  process.env.NODE_ENV === 'production'
    ? compose(applyMiddleware(sagaMiddleware))
    : compose(applyMiddleware(sagaMiddleware), DevTools.instrument());

export const runSaga = sagaMiddleware.run;

export default function configureStore() {
  return createStore(rootReducer, enhancer);
}

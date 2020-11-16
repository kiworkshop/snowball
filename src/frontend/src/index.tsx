import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import store from 'store2';
import { createBrowserHistory } from 'history';
import createSagaMiddleware from 'redux-saga';
import rootReducer, { rootSaga } from './store/modules';
import { loginStoredUser } from './store/modules/user';

import './index.less';
import App from './App';

const customHistory = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware({
  context: {
    history: customHistory,
  },
});

const reduxStore = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

function loadUser() {
  try {
    const storedUser = store.get('snowball-user');
    if (!storedUser) return;
    if (storedUser.expired < Date.now()) {
      store.remove('snowball-user');
      return;
    }

    reduxStore.dispatch(loginStoredUser(storedUser.profile));
  } catch (err) {
    console.log('localstorage is not working');
  }
}

loadUser();

ReactDOM.render(
  <Router history={customHistory}>
    <Provider store={reduxStore}>
      <App />
    </Provider>
  </Router>,
  document.getElementById('root')
);

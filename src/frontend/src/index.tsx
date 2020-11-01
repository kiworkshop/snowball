import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { Provider, useDispatch } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import store from 'store2';
import { createBrowserHistory } from 'history';
import rootReducer from './store/modules';

import './index.less';
import App from './App';
import { User } from './type/user';
import { loginStoredUser } from './store/modules/user';

const customHistory = createBrowserHistory();

const reduxStore = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk.withExtraArgument({ history: customHistory }))
  )
);

function loadUser() {
  try {
    const storedUser = store.get('snowball-user');
    if (!storedUser) return;
    if (storedUser.expired < Date.now()) {
      store.remove('snowball-user');
      return;
    }

    reduxStore.dispatch(loginStoredUser(storedUser.info));
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

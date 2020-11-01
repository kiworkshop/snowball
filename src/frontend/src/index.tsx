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
import { loginStoredUserThunk } from './store/modules/user';

import './index.less';
import App from './App';

const customHistory = createBrowserHistory();

const reduxStore = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk.withExtraArgument({ history: customHistory }))
  )
);

const storedUser = store.get('snowball-user');
if (storedUser) {
  const dispatch = useDispatch();
  dispatch(loginStoredUserThunk(storedUser));
}

ReactDOM.render(
  <Router history={customHistory}>
    <Provider store={reduxStore}>
      <App />
    </Provider>
  </Router>,
  document.getElementById('root')
);

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider, useDispatch } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import store from 'store2';
import rootReducer from './store/modules';
import { loginStoredUserThunk } from './store/modules/user';

import './index.less';
import App from './App';

const reduxStore = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

const storedUser = store.get('snowball-user');
if (storedUser) {
  const dispatch = useDispatch();
  dispatch(loginStoredUserThunk(storedUser));
}

ReactDOM.render(
  <Provider store={reduxStore}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);

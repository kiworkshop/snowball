import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { rootSaga, runSaga, store } from './store';
import history from './lib/history';
import { scrollToTop } from './lib/scroll';
import App from './App';
import './index.less';

runSaga(rootSaga);

history.listen(scrollToTop);

ReactDOM.render(
  <Router history={history}>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById('root')
);

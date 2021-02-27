import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { rootSaga, runSaga, store } from './store';
import { browserHistory, listen } from './lib/history';
import { scrollToTop } from './lib/scroll';
import init from './lib/init';
import App from './App';
import './index.less';

runSaga(rootSaga);

init(store);

listen(scrollToTop);

ReactDOM.render(
  <Router history={browserHistory}>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById('root')
);

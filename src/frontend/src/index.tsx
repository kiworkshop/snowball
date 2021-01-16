import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { browserHistory, listen } from './lib/history';
import { rootSaga } from './store/modules';
import configureStore, { runSaga } from './store/configureStore';
import { scrollToTop } from './lib/scroll';
import DevTools from './container/DevTools';
import App from './App';
import './index.less';

const store = configureStore();
runSaga(rootSaga);

listen(scrollToTop);

ReactDOM.render(
  <Router history={browserHistory}>
    <Provider store={store}>
      <App />
      {process.env.NODE_ENV === 'development' && <DevTools />}
    </Provider>
  </Router>,
  document.getElementById('root')
);

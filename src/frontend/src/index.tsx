import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { rootSaga, runSaga, store } from './store';
import history from './lib/history';
import { scrollToTop } from './lib/scroll';
import App from './App';
import './index.less';

runSaga(rootSaga);

history.listen(scrollToTop);

const queryClient = new QueryClient();

ReactDOM.render(
  <Router history={history}>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <App />
      </Provider>
    </QueryClientProvider>
  </Router>,
  document.getElementById('root')
);

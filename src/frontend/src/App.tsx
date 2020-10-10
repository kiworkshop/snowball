import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import store from 'store2';
import { useDispatch } from 'react-redux';
import { login } from './store/modules/user';

import { Login, Main, CreateNote } from './pages';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const loggedInfo = store.get('user');

    if (!loggedInfo) return;
    if (loggedInfo.expired < Date.now()) return;

    dispatch(login(loggedInfo.user));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Router>
      <Switch>
        <Route path="/" component={Login} exact />
        <Route path="/main" component={Main} exact />
        <Route path="/create/note/:date" component={CreateNote} exact />
      </Switch>
    </Router>
  );
}

export default App;

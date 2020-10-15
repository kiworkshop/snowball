import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import store from 'store2';
import { useDispatch } from 'react-redux';
import { login } from './store/modules/user';

import { Login, Main, CreateNote, Page404, NoteDetail } from './pages';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const userInfo = store.get('snowball-user');

    if (!userInfo) return;
    if (userInfo.expired < Date.now()) {
      store.remove('snowball-user');
      return;
    }

    dispatch(login(userInfo.user));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Router>
      <Switch>
        <Route path="/" component={Main} exact />
        <Route path="/login" component={Login} exact />
        <Route path="/write/note/:date" component={CreateNote} exact />
        <Route path="/note/:id" component={NoteDetail} exact />
        <Route component={Page404} />
      </Switch>
    </Router>
  );
}

export default App;

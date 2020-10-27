import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import store from 'store2';
import { useDispatch } from 'react-redux';
import { login } from './store/modules/user';

import {
  LoginPage,
  MainPage,
  CreateNotePage,
  Page404,
  NoteDetailPage,
  UpdateNotePage,
} from './pages';

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
  }, [dispatch]);

  return (
    <Router>
      <Switch>
        <Route path="/" component={MainPage} exact />
        <Route path="/login" component={LoginPage} exact />
        <Route path="/create/note" component={CreateNotePage} exact />
        <Route path="/update/note/:id" component={UpdateNotePage} />
        <Route path="/note/:id" component={NoteDetailPage} exact />
        <Route component={Page404} />
      </Switch>
    </Router>
  );
}

export default App;

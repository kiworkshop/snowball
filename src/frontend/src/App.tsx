import React from 'react';
import { Route, Switch } from 'react-router-dom';

import {
  LoginPage,
  MainPage,
  CreateNotePage,
  Page404,
  NoteDetailPage,
  UpdateNotePage,
} from './pages';

function App() {
  return (
    <>
      <Switch>
        <Route path="/" component={MainPage} exact />
        <Route path="/login" component={LoginPage} exact />
        <Route path="/write/note" component={CreateNotePage} exact />
        <Route path="/update/note/:id" component={UpdateNotePage} />
        <Route path="/note/:id" component={NoteDetailPage} exact />
        <Route component={Page404} />
      </Switch>
    </>
  );
}

export default App;

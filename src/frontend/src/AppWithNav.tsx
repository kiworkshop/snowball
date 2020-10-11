import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Nav from './component/base/Nav';
import { CreateNote } from './pages';

const AppWithNav = () => {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route path="/create/note" component={CreateNote} exact />
      </Switch>
    </Router>
  );
};

export default AppWithNav;

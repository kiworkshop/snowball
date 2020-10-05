import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Nav from './component/base/Nav';
import { CreateNote, Main } from './pages';

const AppWithNav = () => {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route path="/main" component={Main} exact />
        <Route path="/create/note/:date" component={CreateNote} exact />
      </Switch>
    </Router>
  );
};

export default AppWithNav;

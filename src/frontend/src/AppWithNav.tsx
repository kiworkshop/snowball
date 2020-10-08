import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Nav from './component/base/Nav';
import { CreateNote, Main } from './pages';
import { RootState } from './store/modules';

const AppWithNav = () => {
  const user = useSelector((state: RootState) => state.user);

  return (
    <Router>
      <Nav user={user} />
      <Switch>
        <Route path="/main" component={Main} exact />
        <Route path="/create/note/:date" component={CreateNote} exact />
      </Switch>
    </Router>
  );
};

export default AppWithNav;

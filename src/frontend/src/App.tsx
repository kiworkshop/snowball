import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AppWithNav from './AppWithNav';
import { Login } from './pages';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Login} exact />
        <Route path="/" component={AppWithNav} />
      </Switch>
    </Router>
  );
}

export default App;

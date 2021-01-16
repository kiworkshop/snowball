import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { LoginPage } from './pages';
import AuthApp from './AuthApp';

function App() {
  return (
    <Switch>
      <Route path="/login" component={LoginPage} exact />
      <Route path="/" component={AuthApp} />
    </Switch>
  );
}

export default App;

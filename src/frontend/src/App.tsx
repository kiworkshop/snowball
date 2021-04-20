import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { LoginPage } from './pages';
import AuthApp from './AuthApp';

const App = () => {
  return (
    <Switch>
      <Route path="/user/login" component={LoginPage} exact />
      <AuthApp />
    </Switch>
  );
};

export default App;

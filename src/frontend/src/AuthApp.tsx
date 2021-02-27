import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useAppSelector } from './hooks/store';
import { userSelector } from './lib/selector';
import { browserHistory } from './lib/history';
import { getSelectedMenu } from './lib/nav';
import routes from './routes';
import Layout from './component/base/Layout';
import NavContainer from './container/base/NavContainer';
import AuthAppWrapper from './component/base/AuthAppWrapper';
import { CreateNotePage, MainPage, NoteDetailPage, Page404, UpdateNotePage } from './pages';

const AuthApp = () => {
  const { isLoggedIn, loading } = useAppSelector(userSelector);
  const selectedMenu = [getSelectedMenu(browserHistory.location.pathname)];

  if (loading.getMe) {
    return null;
  }

  if (!isLoggedIn) {
    return <Redirect to={routes.login()} />;
  }

  return (
    <Layout>
      <NavContainer selectedMenu={selectedMenu} />
      <AuthAppWrapper>
        <Switch>
          <Route path="/" component={MainPage} exact />
          <Route path="/create/note" component={CreateNotePage} exact />
          <Route path="/update/note/:id" component={UpdateNotePage} exact />
          <Route path="/note/:id" component={NoteDetailPage} exact />
          <Route component={Page404} />
        </Switch>
      </AuthAppWrapper>
    </Layout>
  );
};

export default AuthApp;

import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { browserHistory } from './lib/history';
import { getSelectedMenu } from './lib/nav';
import Layout from './component/base/Layout';
import NavContainer from './container/base/NavContainer';
import AuthAppWrapper from './component/base/AuthAppWrapper';
import {
  CreateNotePage,
  MainPage,
  NoteDetailPage,
  Page404,
  UpdateNotePage,
} from './pages';
import { useSelector } from 'react-redux';
import { RootState } from './store/modules';

const AuthApp = () => {
  const { isInit, loading } = useSelector((state: RootState) => state.user);

  const selectedMenu = [getSelectedMenu(browserHistory.location.pathname)];

  if (loading.getMe) {
    return null;
  }

  if (!isInit) {
    return <Redirect to="/login" />;
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

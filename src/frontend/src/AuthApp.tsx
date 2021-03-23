import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './hooks/store';
import { userSelector } from './lib/selector';
import history from './lib/history';
import { getSelectedMenu } from './lib/nav';
import userSlice from './features/user';
import Layout from './component/base/Layout';
import NavContainer from './container/base/NavContainer';
import AuthAppWrapper from './component/base/AuthAppWrapper';
import { CreateNotePage, MainPage, NoteDetailPage, Page404, UpdateNotePage } from './pages';

const AuthApp = () => {
  /**
   * redux store
   */
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector(userSelector);
  const userActions = userSlice.actions;

  const [isInit, setIsInit] = useState(false);
  const selectedMenu = [getSelectedMenu(history.location.pathname)];

  useEffect(() => {
    dispatch(userActions.getMeRequest());
    setIsInit(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * TODO: 로딩 중 화면 UI 만들어서 렌더링 하기
   */
  if (!isInit || loading) {
    return null;
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

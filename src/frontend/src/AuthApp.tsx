import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import { useAppDispatch, useUserAction, useUserState } from './hooks';
import history from './lib/history';
import { getSelectedMenu } from './lib/nav';
import * as Color from './constants/colors';
import NavContainer from './container/base/NavContainer';
import Loading from './component/base/Loading';
import { CreateNotePage, MainPage, NoteDetailPage, Page404, UpdateNotePage } from './pages';

const AuthAppContainer = styled.div`
  background-color: ${Color.GRAY_1};
  min-height: 100%;
  min-width: 1190px;
  width: 100%;
`;

const ContentContainer = styled.div`
  margin: 0 auto;
  padding: 30px 0;
  width: 1130px;
`;

const AuthApp = () => {
  const dispatch = useAppDispatch();
  const userAction = useUserAction();
  const { isLoggedIn, loading } = useUserState();

  const selectedMenu = [getSelectedMenu(history.location.pathname)];

  useEffect(() => {
    dispatch(userAction.getMeRequest());
  }, [dispatch, userAction]);

  if (!isLoggedIn || loading) {
    return <Loading />;
  }

  return (
    <AuthAppContainer>
      <NavContainer selectedMenu={selectedMenu} />
      <ContentContainer>
        <Switch>
          <Route path="/" component={MainPage} exact />
          <Route path="/create/note" component={CreateNotePage} exact />
          <Route path="/update/note/:id" component={UpdateNotePage} exact />
          <Route path="/note/:id" component={NoteDetailPage} exact />
          <Route component={Page404} />
        </Switch>
      </ContentContainer>
    </AuthAppContainer>
  );
};

export default AuthApp;

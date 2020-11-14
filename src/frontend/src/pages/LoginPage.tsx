import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { RootState } from '../store/modules';
import routes from '../routes';

import LoginContainer from '../container/login/LoginContainer';

const LoginPage = () => {
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

  return (
    <>
      <LoginContainer />
      {isLoggedIn && <Redirect to={routes.home()} />}
    </>
  );
};

export default LoginPage;

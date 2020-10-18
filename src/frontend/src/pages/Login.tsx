import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { RootState } from '../store/modules';
import routes from '../routes';

import LoginContainer from '../container/login/LoginContainer';

const Login = () => {
  const logged = useSelector((state: RootState) => state.user.logged);

  return (
    <>
      <LoginContainer />
      {logged && <Redirect to={routes.home()} />}
    </>
  );
};

export default Login;

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/modules';

import LoginContainer from '../container/login/LoginContainer';
import { Redirect } from 'react-router-dom';

const Login = () => {
  const logged = useSelector((state: RootState) => state.user.logged);

  return (
    <>
      <LoginContainer />
      {logged && <Redirect to="/main" />}
    </>
  );
};

export default Login;

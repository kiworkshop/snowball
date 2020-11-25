import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import routes from '../../routes';
import { RootState } from '../../store/modules';

import Login from '../../component/login/Login';

const LoginContainer = () => {
  const {
    loading: { login: loading },
    error: { login: error },
    isLoggedIn,
  } = useSelector((state: RootState) => state.user);

  if (isLoggedIn) {
    return <Redirect to={routes.home()} />;
  }

  return (
    <>
      <Login loading={loading} error={error} />
    </>
  );
};

export default LoginContainer;

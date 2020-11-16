import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import routes from '../../routes';
import { RootState } from '../../store/modules';
import { loginAsync } from '../../store/modules/user';

import Login from '../../component/login/Login';

const LoginContainer = () => {
  const dispatch = useDispatch();

  const {
    loading: { login: loading },
    error: { login: error },
    isLoggedIn,
  } = useSelector((state: RootState) => state.user);

  const onClickLoginButton = useCallback(() => {
    dispatch(loginAsync.request());
  }, [dispatch]);

  if (isLoggedIn) {
    return <Redirect to={routes.home()} />;
  }

  return (
    <>
      <Login
        onClickLoginButton={onClickLoginButton}
        loading={loading}
        error={error}
      />
    </>
  );
};

export default LoginContainer;

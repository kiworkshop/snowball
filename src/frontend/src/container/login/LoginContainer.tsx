import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import routes from '../../routes';
import { loginStoredUserThunk, loginThunk } from '../../store/modules/user';
import { RootState } from '../../store/modules';

import Login from '../../component/login/Login';

const LoginContainer = () => {
  const dispatch = useDispatch();

  const {
    loading: { login: loading },
    error: { login: error },
    isLoggedIn,
  } = useSelector((state: RootState) => state.user);

  const tempUserForDevMode = {
    id: '1',
    email: 'snowball@gmail.com',
    name: '눈사람',
    age: 19,
    gender: 'man',
    pictureUrl: '',
    notes: [],
  };

  const onClickLoginButton = useCallback(() => {
    if (process.env.NODE_ENV === 'production') {
      dispatch(loginThunk());
    } else {
      dispatch(loginStoredUserThunk(tempUserForDevMode));
    }
  }, [dispatch, tempUserForDevMode]);

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

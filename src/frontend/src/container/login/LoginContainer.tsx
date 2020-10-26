import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { message } from 'antd';
import routes from '../../routes';
import { login } from '../../store/modules/user';
import { RootState } from '../../store/modules';

import Login from '../../component/login/Login';

const LoginContainer = () => {
  const dispatch = useDispatch();

  const { loading, error, logged } = useSelector(
    (state: RootState) => state.user
  );

  const tempUserForDevMode = {
    id: '1',
    email: 'snowball@gmail.com',
    name: '눈사람',
    age: 19,
    gender: 'man',
    pictureUrl: '',
    notes: [],
  };

  const onClick = useCallback(() => {
    if (process.env.NODE_ENV === 'production') {
      dispatch(login());
    } else {
      dispatch(tempUserForDevMode);
    }
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      message.error(error);
    }
  }, [error]);

  if (logged) {
    return <Redirect to={routes.home()} />;
  }

  return (
    <>
      <Login onClick={onClick} loading={loading} />
    </>
  );
};

export default LoginContainer;

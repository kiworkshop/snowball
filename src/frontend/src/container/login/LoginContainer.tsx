import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import routes from '../../routes';
import { login } from '../../store/modules/user';
import { RootState } from '../../store/modules';

import Login from '../../component/login/Login';
import { message } from 'antd';

const LoginContainer = () => {
  const dispatch = useDispatch();

  const { loading, error, logged } = useSelector(
    (state: RootState) => state.user
  );

  const onClick = useCallback(async () => {
    dispatch(login());
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

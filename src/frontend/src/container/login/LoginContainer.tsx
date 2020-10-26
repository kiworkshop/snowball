import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import store from 'store2';
import routes from '../../routes';
import { login } from '../../store/modules/user';
import { RootState } from '../../store/modules';

import Login from '../../component/login/Login';
import { message } from 'antd';
import { NoteType } from '../../type/note';

const LoginContainer = () => {
  const dispatch = useDispatch();

  const { loading, error, logged } = useSelector(
    (state: RootState) => state.user
  );

  const onClick = useCallback(() => {
    if (process.env.NODE_ENV === 'production') {
      dispatch(login());
    } else {
      dispatch(
        login({
          id: '1',
          email: 'snowball@gmail.com',
          name: '눈사람',
          age: 19,
          gender: 'man',
          pictureUrl: '',
          notes: [],
        })
      );
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

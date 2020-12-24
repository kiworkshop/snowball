import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { RootState } from '../store/modules';
import routes from '../routes';
import LoginTemplateContainer from '../container/login/LoginTemplateContainer';

const LoginPage = () => {
  const { isLoggedIn } = useSelector((state: RootState) => state.user);

  if (isLoggedIn) {
    return <Redirect to={routes.home()} />
  }

  return <LoginTemplateContainer />
};

export default LoginPage;

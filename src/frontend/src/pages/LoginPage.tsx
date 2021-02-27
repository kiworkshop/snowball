import React from 'react';
import { Redirect } from 'react-router-dom';
import { useAppSelector } from '../hooks/store';
import { userSelector } from '../lib/selector';
import LoginTemplateContainer from '../container/login/LoginTemplateContainer';

const LoginPage = () => {
  const { isLoggedIn } = useAppSelector(userSelector);

  if (isLoggedIn) {
    return <Redirect to="/" />;
  }

  return <LoginTemplateContainer />;
};

export default LoginPage;

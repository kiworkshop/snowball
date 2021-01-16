import React from 'react';
import LoginTemplateContainer from '../container/login/LoginTemplateContainer';
import { useSelector } from 'react-redux';
import { RootState } from '../store/modules';
import { Redirect } from 'react-router-dom';

const LoginPage = () => {
  const { isInit } = useSelector((state: RootState) => state.user);

  if (isInit) {
    return <Redirect to="/" />;
  }

  return <LoginTemplateContainer />;
};

export default LoginPage;

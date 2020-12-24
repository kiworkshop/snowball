import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import routes from '../../routes';
import { RootState } from '../../store/modules';
import LoginTemplate from '../../component/login/LoginTemplate';

const LoginTemplateContainer = () => {
  const { isLoggedIn }           = useSelector((state: RootState) => state.user);
  const onClickGoogleLoginButton = useCallback(() => window.location.href = routes.oauth2.google, []);

  if (isLoggedIn) {
    return <Redirect to={routes.home()} />;
  }

  return <LoginTemplate onClickGoogleLoginButton={onClickGoogleLoginButton} />
};

export default LoginTemplateContainer;

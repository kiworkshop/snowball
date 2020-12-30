import React, { useCallback } from 'react';
import routes from '../../routes';
import LoginTemplate from '../../component/login/LoginTemplate';

const LoginTemplateContainer = () => {
  const onClickGoogleLoginButton = useCallback(() => window.location.href = routes.oauth2.google, []);

  return <LoginTemplate onClickGoogleLoginButton={onClickGoogleLoginButton} />
};

export default LoginTemplateContainer;

import React from 'react';
import { login } from '../../lib/api/user';
import Login from '../../component/login/Login';

const LoginContainer = () => {
  const onClick = async () => {
    const user = await login();
    console.log(user);
  };

  return <Login onClick={onClick} />;
};

export default LoginContainer;

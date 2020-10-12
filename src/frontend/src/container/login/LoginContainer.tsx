import React from 'react';
import { useHistory } from 'react-router-dom';
// import { login } from '../../lib/api/user';
import Login from '../../component/login/Login';

const LoginContainer = () => {
  const history = useHistory();

  const onClick = () => {
    history.push('/main');
  };

  return <Login onClick={onClick} />;
};

export default LoginContainer;

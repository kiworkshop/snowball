import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login as loginAPI } from '../../lib/api/user';
import Login from '../../component/login/Login';
import { login } from '../../store/modules/user';

const LoginContainer = () => {
  const dispatch = useDispatch();

  const history = useHistory();

  const onClick = async () => {
    const testUser = await loginAPI();

    if (testUser) {
      dispatch(login(testUser));
    } else {
      dispatch(login({ id: 'testUser', name: '눈사람', pictureUrl: '' }));
    }

    history.push('/main');
  };

  return <Login onClick={onClick} />;
};

export default LoginContainer;

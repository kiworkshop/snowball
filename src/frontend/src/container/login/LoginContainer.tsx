import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import store from 'store2';
import { login as loginAPI } from '../../lib/api/user';
import Login from '../../component/login/Login';
import { login } from '../../store/modules/user';

const LoginContainer = () => {
  const dispatch = useDispatch();

  const history = useHistory();

  const onClick = async () => {
    const response = await loginAPI();
    const testUser = response.data;

    if (testUser) {
      dispatch(login(testUser));
      store.set('snowball-user', {
        user: testUser,
        expired: Date.now() + 1000 * 60 * 60 * 24,
      });
    } else {
      dispatch(login({ id: 'testUser', name: '눈사람', pictureUrl: '' }));
      store.set('snowball-user', {
        user: { id: 'testUser', name: '눈사람', pictureUrl: '' },
        expired: Date.now() + 1000 * 60 * 60 * 24,
      });
    }

    history.push('/main');
  };

  return <Login onClick={onClick} />;
};

export default LoginContainer;

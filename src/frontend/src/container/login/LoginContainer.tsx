import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import store from 'store2';
import { login as loginAPI } from '../../lib/api/user';
import Login from '../../component/login/Login';
import { login } from '../../store/modules/user';
import { message } from 'antd';
import routes from '../../routes';

const LoginContainer = () => {
  const dispatch = useDispatch();

  const history = useHistory();

  const onClick = async () => {
    try {
      const response = await loginAPI();

      if (response.status === 200) {
        const testUser = response.data;

        dispatch(login(testUser));
        store.set('snowball-user', {
          user: testUser,
          expired: Date.now() + 1000 * 60 * 60 * 24,
        });

        history.push(routes.home());
      } else {
        message.info('알 수 없는 오류가 발생했습니다.');
      }
    } catch (e) {
      if (e.message === 'Network Error') {
        console.log(e);

        dispatch(login({ id: 'testUser', name: '눈사람', pictureUrl: '' }));
        store.set('snowball-user', {
          user: { id: 'testUser', name: '눈사람', pictureUrl: '' },
          expired: Date.now() + 1000 * 60 * 60 * 24,
        });

        history.push(routes.home());
      } else {
        message.info('알 수 없는 오류가 발생했습니다.');
      }
    }
  };

  return <Login onClick={onClick} />;
};

export default LoginContainer;

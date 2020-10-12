import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import store from 'store2';
import { RootState } from '../../store/modules';
import { logout } from '../../store/modules/user';

import Nav from '../../component/base/Nav';

const NavContainer = () => {
  const user = useSelector((state: RootState) => state.user.loginInfo);
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logout());
    store.remove('snowball-user');
  };

  return <Nav user={user} onLogout={onLogout} />;
};

export default NavContainer;

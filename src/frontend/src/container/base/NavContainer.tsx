import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/modules';
import { logout } from '../../store/modules/user';

import Nav from '../../component/base/Nav';

const NavContainer = () => {
  const user = useSelector((state: RootState) => state.user.userInfo);
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logout());
  };

  return <Nav user={user} onLogout={onLogout} />;
};

export default NavContainer;

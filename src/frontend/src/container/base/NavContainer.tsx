import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { RootState } from '../../store/modules';
import { logout } from '../../store/modules/user';

import Nav from '../../component/base/Nav';

interface NavContainerProps {
  selectedMenu?: Array<string>;
}

const NavContainer: React.FC<NavContainerProps> = ({ selectedMenu }) => {
  const user = useSelector((state: RootState) => state.user.profile);
  const dispatch = useDispatch();

  const onLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  const history = useHistory();
  const onClickNavLink = (link: string) => () => history.push(link);

  return (
    <Nav
      user={user}
      onLogout={onLogout}
      onClickNavLink={onClickNavLink}
      selectedKeys={selectedMenu}
    />
  );
};

export default NavContainer;

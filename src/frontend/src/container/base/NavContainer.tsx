import React, { useCallback, useState } from 'react';
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
    const willLogout = window.confirm('로그아웃 하시겠습니까?');

    if (willLogout) {
      dispatch(logout());
    }
  }, [dispatch]);

  const history = useHistory();
  const onClickNavLink = (link: string) => () => history.push(link);

  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const showDrawer = useCallback(() => {
    setIsDrawerVisible(true);
  }, []);
  const hideDrawer = useCallback(() => {
    setIsDrawerVisible(false);
  }, []);

  return (
    <Nav
      user={user}
      onLogout={onLogout}
      onClickNavLink={onClickNavLink}
      selectedKeys={selectedMenu}
      isDrawerVisible={isDrawerVisible}
      showDrawer={showDrawer}
      hideDrawer={hideDrawer}
    />
  );
};

export default NavContainer;

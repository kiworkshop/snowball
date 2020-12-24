import React, { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { RootState } from '../../store/modules';
import { logout } from '../../store/modules/user';
import Nav from '../../component/base/Nav';
import MobileNav from '../../component/base/MobileNav';

interface NavContainerProps {
  selectedMenu?: Array<string>;
}


const NavContainer: React.FC<NavContainerProps> = ({ selectedMenu }) => {
  const history  = useHistory();
  const dispatch = useDispatch();
  const profile  = useSelector((state: RootState) => state.user.profile);

  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

  const onLogout       = useCallback(() => window.confirm('로그아웃 하시겠습니까?') && dispatch(logout()), [dispatch]);
  const onClickNavLink = useCallback((link: string) => () => history.push(link), [history]);
  const showDrawer     = useCallback(() => setIsDrawerVisible(true), []);
  const hideDrawer     = useCallback(() => setIsDrawerVisible(false), []);

  return (
    <>
      <Nav
        profile={profile}
        onLogout={onLogout}
        onClickNavLink={onClickNavLink}
        selectedMenu={selectedMenu}
      />

      <MobileNav
        profile={profile}
        onLogout={onLogout}
        onClickNavLink={onClickNavLink}
        selectedMenu={selectedMenu}
        isDrawerVisible={isDrawerVisible}
        showDrawer={showDrawer}
        hideDrawer={hideDrawer}
      />
    </>
  );
};

export default NavContainer;

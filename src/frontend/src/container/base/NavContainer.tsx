import React, { useCallback, useState } from 'react';
import { useAppDispatch, useUserAction, useUserState } from '../../hooks';
import history from '../../lib/history';
import Nav from '../../component/base/Nav';
import MobileNav from '../../component/base/MobileNav';

interface NavContainerProps {
  selectedMenu?: Array<string>;
}

const NavContainer: React.FC<NavContainerProps> = ({ selectedMenu }) => {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

  const dispatch = useAppDispatch();
  const { profile } = useUserState();
  const userActions = useUserAction();

  const onLogout = useCallback(() => {
    if (window.confirm('로그아웃 하시겠습니까?')) {
      dispatch(userActions.logout());
    }
  }, [dispatch, userActions]);

  const onClickNavLink = useCallback((link: string) => {
    history.push(link);
  }, []);

  const showDrawer = useCallback(() => {
    setIsDrawerVisible(true);
  }, []);

  const hideDrawer = useCallback(() => {
    setIsDrawerVisible(false);
  }, []);

  return (
    <>
      <Nav profile={profile} onLogout={onLogout} onClickNavLink={onClickNavLink} selectedMenu={selectedMenu} />

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

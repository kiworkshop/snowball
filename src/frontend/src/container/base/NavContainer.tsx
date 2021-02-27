import React, { useCallback, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import * as history from '../../lib/history';
import { userSelector } from '../../lib/selector';
import userSlice from '../../features/user';
import Nav from '../../component/base/Nav';
import MobileNav from '../../component/base/MobileNav';

interface NavContainerProps {
  selectedMenu?: Array<string>;
}

const NavContainer: React.FC<NavContainerProps> = ({ selectedMenu }) => {
  /**
   * component state
   */
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

  /**
   * redux store
   */
  const dispatch = useAppDispatch();
  const { profile } = useAppSelector(userSelector);
  const userActions = userSlice.actions;

  /**
   * functions
   */
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

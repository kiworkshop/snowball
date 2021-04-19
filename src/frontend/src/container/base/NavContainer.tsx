import React, { useCallback } from 'react';
import { useAppDispatch, useUserAction, useUserState } from '../../hooks';
import history from '../../lib/history';
import Nav from '../../component/base/Nav';

interface NavContainerProps {
  selectedMenu?: Array<string>;
}

const NavContainer: React.FC<NavContainerProps> = ({ selectedMenu }) => {
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

  return <Nav profile={profile} onLogout={onLogout} onClickNavLink={onClickNavLink} selectedMenu={selectedMenu} />;
};

export default NavContainer;

import React from 'react';
import { Dropdown, Menu } from 'antd';
import { HomeFilled } from '@ant-design/icons';
import { FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface Props {
  user: {
    id: string;
    name: string;
    pictureUrl: string;
  };
  onLogout: () => void;
}

const StyledNav = styled.nav`
  box-shadow: 0 4px 2px -4px gray;
  height: 80px;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
`;

const NavInner = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  position: relative;
`;

const BrandTitle = styled(Link)`
  color: #141414;
  font-size: 2rem;
  font-weight: 600;
  left: 30px;
  position: absolute;

  &:hover {
    color: #595959;
  }
`;

const NavMenusWrapper = styled.ul`
  display: flex;
  margin-bottom: 0;
  padding-left: 0;
`;

const NavMenu = styled(Link)`
  align-items: center;
  color: #141414;
  display: flex;
  flex-direction: column;

  &:hover {
    color: #595959;
  }
`;

const UserWrapper = styled.div`
  align-items: center;
  cursor: pointer;
  display: flex;
  position: absolute;
  right: 30px;
`;

const UserIcon = styled(FaUserCircle)`
  height: 40px;
  margin-right: 8px;
  width: 40px;
`;

const Username = styled.span`
  font-size: 1.1rem;
`;

const EmptyDiv = styled.div`
  height: 80px;
`;

const Nav: React.FC<Props> = ({ user, onLogout }) => {
  const ProfileMenus = (
    <Menu>
      <Menu.Item key="0" onClick={onLogout}>
        로그아웃
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <StyledNav>
        <NavInner>
          <BrandTitle to="/main">SNOWBALL</BrandTitle>

          <NavMenusWrapper>
            <NavMenu to="/main">
              <HomeFilled style={{ fontSize: '2rem' }} />홈
            </NavMenu>
          </NavMenusWrapper>

          <Dropdown
            overlay={ProfileMenus}
            placement="bottomRight"
            trigger={['click']}
          >
            <UserWrapper>
              <UserIcon />
              <Username>{user.name}</Username>
            </UserWrapper>
          </Dropdown>
        </NavInner>
      </StyledNav>
      <EmptyDiv />
    </>
  );
};

export default Nav;

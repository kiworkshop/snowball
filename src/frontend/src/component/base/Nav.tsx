import React from 'react';
import { Layout, Dropdown, Menu, Button } from 'antd';
import { HomeOutlined, DownOutlined } from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import routes from '../../routes';

import { UserType } from '../../type/user';

interface NavProps {
  user: UserType.UserInfo;
  onLogout: () => void;
}

const { Header } = Layout;

const StyledHeader = styled(Header)`
  background: #fff;
  box-shadow: 0 2px 8px #f0f1f2;
  display: flex;
  justify-content: space-between;
  position: fixed;
  width: 100%;
  z-index: 1;
`;

const NavLink = styled(Link)`
  color: #141414;

  &:hover {
    color: #595959;
  }
`;

const Nav: React.FC<NavProps> = ({ user, onLogout }) => {
  const ProfileMenus = (
    <Menu>
      <Menu.Item key="0" onClick={onLogout}>
        로그아웃
      </Menu.Item>
    </Menu>
  );

  const history = useHistory();

  return (
    <StyledHeader>
      <NavLink to={routes.home()}>SNOWBALL</NavLink>
      <Menu mode="horizontal">
        <Menu.Item
          key="1"
          icon={<HomeOutlined />}
          onClick={() => history.push(routes.home())}
        >
          홈
        </Menu.Item>
        <Dropdown overlay={ProfileMenus} trigger={['click']}>
          <Button type="text" style={{ marginBottom: '5px' }}>
            {user.name} 님 <DownOutlined />
          </Button>
        </Dropdown>
      </Menu>
    </StyledHeader>
  );
};

export default Nav;

import React from 'react';
import { Layout, Dropdown, Menu, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import routes from '../../routes';
import { Profile } from '../../store/modules/user';
import logo from '../../static/images/logo.png';

import Container from './Container';

interface NavProps {
  user: Profile;
  onLogout: () => void;
  onClickNavLink: (link: string) => () => void;
  selectedKeys?: Array<string>;
}

const { Header } = Layout;

const StyledHeader = styled(Header)`
  background: #fff;
  box-shadow: 0 2px 8px #f0f1f2;
  left: 0;
  padding: 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 2;
`;

const HeaderInner = styled(Container)`
  align-items: center;
  display: flex;
  justify-content: space-between;
`;

const Nav: React.FC<NavProps> = ({
  user,
  onLogout,
  onClickNavLink,
  selectedKeys,
}) => {
  const ProfileMenus = (
    <Menu>
      <Menu.Item key="0" onClick={onLogout}>
        로그아웃
      </Menu.Item>
    </Menu>
  );

  return (
    <StyledHeader>
      <HeaderInner>
        <Link to={routes.home()}>
          <img src={logo} alt="logo" width="180" />
        </Link>

        <Menu
          mode="horizontal"
          selectedKeys={selectedKeys}
          style={{ borderBottom: 'none' }}
        >
          <Menu.Item key="home" onClick={onClickNavLink(routes.home())}>
            홈
          </Menu.Item>

          <Menu.Item
            key="createNote"
            onClick={onClickNavLink(routes.note.create())}
          >
            투자노트 작성
          </Menu.Item>

          <Menu.Item key="portfolio" onClick={onClickNavLink(routes.home())}>
            포트폴리오
          </Menu.Item>

          <Dropdown overlay={ProfileMenus} trigger={['click']}>
            <Button style={{ marginLeft: '20px' }}>
              {user.name} 님 <DownOutlined />
            </Button>
          </Dropdown>
        </Menu>
      </HeaderInner>
    </StyledHeader>
  );
};

export default Nav;

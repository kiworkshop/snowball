import React from 'react';
import { Layout, Dropdown, Menu, Button, Drawer } from 'antd';
import { DownOutlined, MenuOutlined } from '@ant-design/icons';
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
  isDrawerVisible: boolean;
  showDrawer: () => void;
  hideDrawer: () => void;
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

  @media (max-width: 575px) {
    padding: 0 20px;
  }
`;

const DesktopMenu = styled(Menu)`
  border-bottom: none;

  @media (max-width: 767px) {
    display: none;
  }
`;

const MobileAndTabletDrawer = styled(Drawer)`
  @media (min-width: 768px) {
    display: none;
  }
`;

const MobileAndTabletMenu = styled(Menu)`
  border-right: none;
`;

const MobileAndTabletDrawerTrigger = styled(Button)`
  @media (min-width: 768px) {
    display: none;
  }
`;

const Nav: React.FC<NavProps> = ({
  user,
  onLogout,
  onClickNavLink,
  selectedKeys,
  isDrawerVisible,
  showDrawer,
  hideDrawer,
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

        <DesktopMenu mode="horizontal" selectedKeys={selectedKeys}>
          <Menu.Item key="home" onClick={onClickNavLink(routes.home())}>
            홈
          </Menu.Item>

          <Menu.Item
            key="createNote"
            onClick={onClickNavLink(routes.note.create())}
          >
            투자노트 작성
          </Menu.Item>

          <Dropdown overlay={ProfileMenus} trigger={['click']}>
            <Button style={{ marginLeft: '20px' }}>
              {user.name} 님 <DownOutlined />
            </Button>
          </Dropdown>
        </DesktopMenu>

        <MobileAndTabletDrawerTrigger
          size="large"
          icon={<MenuOutlined />}
          onClick={showDrawer}
        />

        <MobileAndTabletDrawer
          title={`${user.name} 님`}
          visible={isDrawerVisible}
          placement="right"
          onClose={hideDrawer}
        >
          <MobileAndTabletMenu mode="vertical" selectedKeys={selectedKeys}>
            <Menu.Item key="home" onClick={onClickNavLink(routes.home())}>
              홈
            </Menu.Item>

            <Menu.Item
              key="createNote"
              onClick={onClickNavLink(routes.note.create())}
            >
              투자노트 작성
            </Menu.Item>

            <Menu.Item key="0" onClick={onLogout}>
              로그아웃
            </Menu.Item>
          </MobileAndTabletMenu>
        </MobileAndTabletDrawer>
      </HeaderInner>
    </StyledHeader>
  );
};

export default Nav;

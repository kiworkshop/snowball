import React from 'react';
import styled from 'styled-components';
import { Button, Drawer, Layout, Menu } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { Profile } from '../../store/modules/user';
import Screen from '../../constants/screen';
import routes from '../../routes';
import Container from './Container';

interface MobileNavProps {
  profile: Profile;
  selectedMenu?: Array<string>;
  isDrawerVisible: boolean;
  onLogout: () => void;
  showDrawer: () => void;
  hideDrawer: () => void;
  onClickNavLink: (link: string) => () => void;
}

const Header = styled(Layout.Header)`
  background: #fff;
  box-shadow: 0 2px 8px #f0f1f2;
  left: 0;
  padding: 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;

  @media (min-width: ${Screen.MIN_MEDIUM}px) {
    display: none;
  }
`;

const InnerWrapper = styled(Container)`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: space-between;

  @media (max-width: ${Screen.MAX_SMALL}px) {
    padding: 0 20px;
  }
`;

const MenuDrawer = styled(Drawer)`
  @media (min-width: ${Screen.MIN_MEDIUM}px) {
    display: none;
  }
`;

const MobileAndTabletMenu = styled(Menu)`
  border-right: none;
`;

const DrawerTrigger = styled(Button)`
  @media (min-width: ${Screen.MIN_MEDIUM}px) {
    display: none;
  }
`;

const MobileNav: React.FC<MobileNavProps> = ({
  profile,
  onLogout,
  onClickNavLink,
  selectedMenu,
  isDrawerVisible,
  showDrawer,
  hideDrawer,
}) => {
  return (
    <Header>
      <InnerWrapper>
        <DrawerTrigger
          size="large"
          icon={<MenuOutlined />}
          onClick={showDrawer}
        />

        <MenuDrawer
          title={`${profile.name} 님`}
          visible={isDrawerVisible}
          placement="right"
          onClose={hideDrawer}
        >
          <MobileAndTabletMenu mode="vertical" selectedKeys={selectedMenu}>
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
        </MenuDrawer>
      </InnerWrapper>
    </Header>
  );
};

export default MobileNav;

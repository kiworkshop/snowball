import React from 'react';
import { Layout, Dropdown, Menu, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import routes from '../../routes';
import { Profile } from '../../store/modules/user';
import { MAX_MEDIUM } from '../../constants/screen';
import logo from '../../static/images/logo.png';
import Container from './Container';

interface NavProps {
  profile: Profile;
  selectedMenu?: Array<string>;
  onLogout: () => void;
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

  @media (max-width: ${MAX_MEDIUM}px) {
    display: none;
  }
`;


const InnerWrapper = styled(Container)`
  align-items: center;
  display: flex;
  justify-content: space-between;
`;


const NavMenu = styled(Menu)`
  border-bottom: none;
`;


const Nav: React.FC<NavProps> = ({
  profile,
  onLogout,
  onClickNavLink,
  selectedMenu,
}) => {
  const ProfileMenus = (
    <Menu>
      <Menu.Item key="0" onClick={onLogout}>
        로그아웃
      </Menu.Item>
    </Menu>
  );

  return (
    <Header>
      <InnerWrapper>
        <Link to={routes.home()}>
          <img src={logo} alt="logo" width="180" />
        </Link>

        <NavMenu mode="horizontal" selectedKeys={selectedMenu}>
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
              {profile.name} 님 <DownOutlined />
            </Button>
          </Dropdown>
        </NavMenu>
      </InnerWrapper>
    </Header>
  );
};

export default Nav;

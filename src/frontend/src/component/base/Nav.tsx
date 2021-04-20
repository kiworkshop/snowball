import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Layout, Dropdown, Menu, Button } from 'antd';
import routes from '../../routes';
import logo from '../../static/images/logo.png';
import * as Color from '../../constants/colors';
import * as Type from '../../types';

interface NavProps {
  profile: Type.Profile;
  selectedMenu?: Array<string>;
  onLogout: () => void;
  onClickNavLink: (link: string) => void;
}

const Header = styled(Layout.Header)`
  background: ${Color.WHITE};
  box-shadow: 5px 0 5px rgba(0, 0, 0, 0.1);
  padding: 0;
  min-width: 1190px;
  width: 100%;
`;

const InnerWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  width: 1130px;
`;

const NavMenu = styled(Menu)`
  border-bottom: none;
`;

const NavMenuItem = styled(Menu.Item)`
  height: 64px;
`;

const ProfileButton = styled(Button)`
  border: 0;
  border-radius: 50%;
  height: 40px;
  margin-left: 20px;
  overflow: hidden;
  padding: 0;
  width: 40px;
`;

const ProfileImage = styled.img`
  height: 100%;
  object-fit: cover;
  width: 100%;
`;

const Nav: React.FC<NavProps> = ({ profile, onLogout, onClickNavLink, selectedMenu }) => {
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
        <Link to={routes.home}>
          <img src={logo} alt="logo" width="180" />
        </Link>

        <NavMenu mode="horizontal" selectedKeys={selectedMenu}>
          <NavMenuItem key="createNote" onClick={() => onClickNavLink(routes.note.create)}>
            투자노트 작성
          </NavMenuItem>

          <NavMenuItem key="myPortfolio" onClick={() => onClickNavLink(routes.portfolio.detail)}>
            내 포트폴리오
          </NavMenuItem>

          <Dropdown overlay={ProfileMenus} trigger={['click']} placement="bottomRight">
            <ProfileButton>
              <ProfileImage src={profile.pictureUrl} alt="프로필 사진" />
            </ProfileButton>
          </Dropdown>
        </NavMenu>
      </InnerWrapper>
    </Header>
  );
};

export default Nav;

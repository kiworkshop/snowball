import { HomeFilled } from '@ant-design/icons';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Container from './Container';

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
  display: flex;
  position: absolute;
  right: 30px;
`;

const UserIcon = styled.img`
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

const Nav = () => {
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
          <UserWrapper>
            <UserIcon src="https://upload.wikimedia.org/wikipedia/commons/f/f4/Font_Awesome_5_solid_user-circle.svg" />
            <Username>눈사람</Username>
          </UserWrapper>
        </NavInner>
      </StyledNav>
      <EmptyDiv />
    </>
  );
};

export default Nav;

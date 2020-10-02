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

const NavInner = styled(Container)`
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
  left: 0;
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
        </NavInner>
      </StyledNav>
      <EmptyDiv />
    </>
  );
};

export default Nav;

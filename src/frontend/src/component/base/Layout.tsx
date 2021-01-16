import React from 'react';
import styled from 'styled-components';
import { Layout as antdLayout } from 'antd';

interface LayoutProps {
  children: React.ReactNode;
}

const StyledLayout = styled(antdLayout)`
  min-height: 100%;
  padding-top: 64px;
`;

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return <StyledLayout>{children}</StyledLayout>;
};

export default Layout;

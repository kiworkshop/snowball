import React from 'react';
import styled from 'styled-components';
import { MAX_MEDIUM } from '../../constants/screen';
import Container from './Container';

interface AuthAppContainerProps {
  children: React.ReactNode;
}

const StyledContainer = styled(Container)`
  padding: 30px 0;

  @media (max-width: ${MAX_MEDIUM}px) {
    padding: 30px 20px;
  }
`;

const AuthAppWrapper: React.FC<AuthAppContainerProps> = ({ children }) => {
  return <StyledContainer>{children}</StyledContainer>;
};

export default AuthAppWrapper;

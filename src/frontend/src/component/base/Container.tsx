import React from 'react';
import styled from 'styled-components';
import Screen from '../../constants/screen';

interface ContainerProps {
  children: React.ReactNode;
  [propName: string]: React.ReactNode | {};
}

const StyledContainer = styled.div`
  margin: 0 auto;
  width: 100%;

  @media (min-width: ${Screen.MIN_SMALL}px) {
    width: 540px;
  }

  @media (min-width: ${Screen.MIN_MEDIUM}px) {
    width: 720px;
  }

  @media (min-width: ${Screen.MIN_LARGE}px) {
    width: 960px;
  }

  @media (min-width: ${Screen.MIN_EXTRA_LARGE}px) {
    width: 1140px;
  }
`;

const Container: React.FC<ContainerProps> = ({ children, ...rest }) => {
  return <StyledContainer {...rest}>{children}</StyledContainer>;
};

export default Container;

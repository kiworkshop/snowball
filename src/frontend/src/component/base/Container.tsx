import React from 'react';
import styled from 'styled-components';

interface ContainerProps {
  children: React.ReactNode;
  [propName: string]: React.ReactNode | {};
}

const StyledContainer = styled.div`
  margin: 0 auto;
  width: 100%;

  @media (max-width: 575px) {
    padding: 20px !important;
  }

  @media (min-width: 576px) {
    width: 540px;
  }

  @media (min-width: 768px) {
    width: 720px;
  }

  @media (min-width: 992px) {
    width: 960px;
  }

  @media (min-width: 1200px) {
    width: 1140px;
  }
`;

const Container: React.FC<ContainerProps> = ({ children, ...rest }) => {
  return <StyledContainer {...rest}>{children}</StyledContainer>;
};

export default Container;

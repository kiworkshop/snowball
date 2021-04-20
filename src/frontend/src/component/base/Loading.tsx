import React from 'react';
import styled from 'styled-components';
import spinnerImage from '../../static/images/spinner.gif';

const SpinnerContainer = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
`;

const Spinner = styled.img`
  width: 150px;
`;

const Loading = () => {
  return (
    <SpinnerContainer>
      <Spinner src={spinnerImage} alt="로딩중 이미지" />
    </SpinnerContainer>
  );
};

export default Loading;

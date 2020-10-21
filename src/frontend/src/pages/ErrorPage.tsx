import React, { useCallback } from 'react';
import styled from 'styled-components';
import { Space, Button, Typography } from 'antd';
import { useHistory } from 'react-router-dom';
import errorImage from '../static/images/error.svg';

const { Title, Paragraph } = Typography;

const PageContainer = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  width: 100%;
`;

const ErrorImg = styled.img`
  margin-bottom: 50px;
  width: 300px;
`;

const MainMessage = styled(Title)`
  color: #4e89ae !important;
  text-shadow: 4px 4px 8px rgba(150, 150, 150, 0.35);
`;

const SubMessage = styled(Paragraph)`
  color: rgba(78, 137, 174, 0.9);
`;

const ErrorPage = () => {
  const history = useHistory();

  const onClick = useCallback(() => {
    history.goBack();
  }, [history]);

  return (
    <PageContainer>
      <Space direction="vertical" align="center">
        <ErrorImg src={errorImage} />
        <Space direction="vertical" align="center">
          <MainMessage>Error Occurred</MainMessage>
          <SubMessage>페이지를 불러오던 중 오류가 발생했습니다.</SubMessage>
          <Button size="large" onClick={onClick}>
            돌아가기
          </Button>
        </Space>
      </Space>
    </PageContainer>
  );
};

export default ErrorPage;

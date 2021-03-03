import React, { useCallback } from 'react';
import styled from 'styled-components';
import { Space, Button, Typography } from 'antd';
import { useHistory } from 'react-router-dom';
import snowmanImage from '../static/images/snowman.svg';
import routes from '../routes';

const PageContainer = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  width: 100%;
`;

const SnowmanImg = styled.img`
  margin-right: 30px;
  width: 180px;
`;

const MainMessage = styled(Typography.Title)`
  color: #4e89ae !important;
  text-shadow: 4px 4px 8px rgba(150, 150, 150, 0.35);
`;

const SubMessage = styled(Typography.Paragraph)`
  color: rgba(78, 137, 174, 0.9);
`;

const Page404 = () => {
  const history = useHistory();
  const onClick = useCallback(() => history.push(routes.home), [history]);

  return (
    <PageContainer>
      <Space>
        <SnowmanImg src={snowmanImage} />
        <div>
          <MainMessage>404 Not Found</MainMessage>
          <SubMessage>페이지를 찾을 수 없습니다. 올바른 주소를 입력해주세요.</SubMessage>
          <Button size="large" onClick={onClick}>
            홈으로
          </Button>
        </div>
      </Space>
    </PageContainer>
  );
};

export default Page404;

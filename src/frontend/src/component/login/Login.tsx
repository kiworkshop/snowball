import React from 'react';
import styled from 'styled-components';
import { Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';

interface LoginProps {
  onClick: () => void;
}

const LoginContainer = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  width: 100%;
`;

const LoginInner = styled.div`
  margin: auto;
  max-width: 600px;
  width: 100%;
`;

const TitleWrapper = styled.div`
  margin-bottom: 5rem;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 6rem;
  margin-bottom: 0;
`;

const SubTitle = styled.span`
  color: #595959;
  font-size: 1.2rem;
`;

const Copyright = styled.h5`
  font-size: 1rem;
  margin-top: 100px;
  text-align: center;
`;

const Login: React.FC<LoginProps> = ({ onClick }) => {
  return (
    <LoginContainer>
      <LoginInner>
        <TitleWrapper>
          <Title>SNOWBALL</Title>
          <SubTitle>매일매일 굴러가는 당신의 자산을 관리하세요!</SubTitle>
        </TitleWrapper>

        <Button
          block
          icon={<UserOutlined />}
          style={{ fontSize: '1.2rem', fontWeight: 800, height: '60px' }}
          onClick={onClick}
        >
          테스트 유저 로그인
        </Button>

        <Copyright>SNOWBALL &copy; 2020</Copyright>
      </LoginInner>
    </LoginContainer>
  );
};

export default Login;

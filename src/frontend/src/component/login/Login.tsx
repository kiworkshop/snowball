import React from 'react';
import { Layout, Typography, Spin, message } from 'antd';
import styled from 'styled-components';

import routes from '../../routes';
import logo from '../../static/images/logo.png';
import googleLogo from '../../static/images/google.png';

interface LoginProps {
  loading: boolean;
  error: Error | null;
}

const GoogleLoginButton = styled.a`
  align-items: center;
  border: 1px solid #d9d9d9;
  color: #434343;
  display: flex;
  font-size: 1.1rem;
  font-weight: bold;
  height: 56px;
  justify-content: center;
  padding: 4px 100px;

  &:hover {
    color: #000;
  }

  img {
    margin: 10px;
    width: 30px;
  }
`;

const { Content, Footer } = Layout;
const { Title } = Typography;

const Login: React.FC<LoginProps> = ({ loading, error }) => {
  if (error) {
    message.error(error);
  }

  return (
    <Layout
      style={{
        alignItems: 'center',
        background: '#fff',
        height: '100%',
      }}
    >
      <Content
        style={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Title style={{ fontSize: '6rem', marginBottom: '16px' }}>
          <img src={logo} alt="logo" width="500" />
        </Title>

        <Title level={4} style={{ color: '#25476A', margin: '0 0 80px 0' }}>
          매일매일 굴러가는 당신의 자산을 관리하세요!
        </Title>

        <Spin tip="로딩중..." spinning={!!loading}>
          <GoogleLoginButton href={routes.oauth2.google}>
            <img src={googleLogo} alt="google login" />
            구글 로그인
          </GoogleLoginButton>
        </Spin>
      </Content>

      <Footer style={{ background: '#fff', textAlign: 'center' }}>
        SNOWBALL &copy; 2020
      </Footer>
    </Layout>
  );
};

export default Login;

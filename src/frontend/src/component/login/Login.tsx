import React from 'react';
import { Layout, Typography, Button, Spin, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import logo from '../../static/images/logo.png';

interface LoginProps {
  loading: boolean;
  error: Error | null;
  onClickLoginButton: () => void;
}

const { Content, Footer } = Layout;
const { Title } = Typography;

const Login: React.FC<LoginProps> = ({
  onClickLoginButton,
  loading,
  error,
}) => {
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

        <Title level={4} style={{ color: '#595959', margin: '0 0 80px 0' }}>
          매일매일 굴러가는 당신의 자산을 관리하세요!
        </Title>

        <Spin tip="로딩중..." spinning={!!loading}>
          <Button
            icon={<UserOutlined />}
            style={{
              fontSize: '1.2rem',
              fontWeight: 800,
              height: '56px',
            }}
            onClick={onClickLoginButton}
          >
            테스트 유저 로그인
          </Button>
            <a href="/oauth2/authorization/google">
                구글 로그인
            </a>
        </Spin>
      </Content>

      <Footer style={{ background: '#fff', textAlign: 'center' }}>
        SNOWBALL &copy; 2020
      </Footer>
    </Layout>
  );
};

export default Login;

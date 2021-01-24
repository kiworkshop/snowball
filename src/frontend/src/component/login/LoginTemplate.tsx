import React from 'react';
import { Button } from 'antd';
import styled from 'styled-components';
import Screen from '../../constants/screen';
import brandLogo from '../../static/images/logo.png';
import googleLogo from '../../static/images/google.png';
import Container from '../base/Container';

interface LoginProps {
  onClickGoogleLoginButton: () => void;
}

const Wrapper = styled(Container)`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;

  @media (max-width: ${Screen.MAX_MEDIUM}px) {
    padding: 0 20px;
  }
`;

const BrandLogo = styled.img`
  max-width: 500px;
  width: 100%;
`;

const BrandSlogan = styled.h1`
  font-size: 1.2rem;
  margin: 0 0 80px 0;
  text-align: center;
  word-break: keep-all;

  @media (max-width: ${Screen.MAX_MEDIUM}px) {
    font-size: 1rem;
  }
`;

const GoogleLoginButton = styled(Button)`
  font-size: 1rem;
  height: 50px;
  max-width: 450px;
  width: 100%;
`;

const GoogleLogo = styled.img`
  margin-right: 5px;
  width: 30px;
`;

const Footer = styled.footer`
  bottom: 30px;
  left: 0;
  position: fixed;
  text-align: center;
  width: 100%;
`;

const LoginTemplate: React.FC<LoginProps> = ({ onClickGoogleLoginButton }) => {
  return (
    <Wrapper>
      <BrandLogo src={brandLogo} alt="brand logo" />
      <BrandSlogan>매일매일 굴러가는 당신의 자산을 관리하세요!</BrandSlogan>
      <GoogleLoginButton
        icon={<GoogleLogo src={googleLogo} alt="google login button" />}
        onClick={onClickGoogleLoginButton}
      >
        구글 계정으로 로그인
      </GoogleLoginButton>
      <Footer>SNOWBALL &copy; 2020</Footer>
    </Wrapper>
  );
};

export default LoginTemplate;

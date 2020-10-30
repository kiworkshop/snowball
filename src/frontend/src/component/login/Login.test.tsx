import React from 'react';
import { render } from '@testing-library/react';
import Login from './Login';

describe('<Login />', () => {
  it('render component', () => {
    const onClick = () => console.log('login');
    const { getByText } = render(<Login onClickLoginButton={onClick} />);

    const title = getByText('SNOWBALL');
    const subTitle = getByText('매일매일 굴러가는 당신의 자산을 관리하세요!');
    const loginButton = getByText('테스트 유저 로그인');

    expect(title).toBeInTheDocument();
    expect(subTitle).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });
});

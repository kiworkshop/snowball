import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Container from './Container';
import Nav from './Nav';

const TempComponent = () => {
  return <p>snowball</p>;
};

describe('<Container />', () => {
  it('render component', () => {
    const { getByText } = render(
      <Container>
        <TempComponent />{' '}
      </Container>
    );

    const snowball = getByText('snowball');
    expect(snowball).toBeInTheDocument();
  });
});

describe('<Nav />', () => {
  it('render component', () => {
    const user = { id: '1', name: 'snowman', pictureUrl: '/' };
    const onLogout = () => console.log('logout');

    const { getByText } = render(
      <Router>
        <Nav user={user} onLogout={onLogout} />
      </Router>
    );

    const title = getByText('SNOWBALL');
    const homeMenu = getByText('홈');
    const username = getByText('snowman');

    expect(title).toBeInTheDocument();
    expect(homeMenu).toBeInTheDocument();
    expect(username).toBeInTheDocument();
  });

  it('click profile and show logout button', () => {
    const user = { id: '1', name: 'snowman', pictureUrl: '/' };
    const onLogout = () => console.log('logout');

    const { container, queryByText } = render(
      <Router>
        <Nav user={user} onLogout={onLogout} />
      </Router>
    );

    let logoutButton = queryByText('로그아웃');
    expect(logoutButton).toBeNull();

    const dropdown = container.getElementsByClassName('ant-dropdown-trigger');
    fireEvent.click(dropdown[0]);
    logoutButton = queryByText('로그아웃');
    expect(logoutButton).toBeInTheDocument();
  });
});

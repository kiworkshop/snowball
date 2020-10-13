import React from 'react';
import { render } from '@testing-library/react';
import Container from './Container';

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

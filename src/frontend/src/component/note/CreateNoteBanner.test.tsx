import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import moment from 'moment';
import CreateNoteBanner from './CreateNoteBanner';

describe('<CreateNoteBanner />', () => {
  it('render component', () => {
    const { getByText } = render(
      <Router>
        <CreateNoteBanner nickname="snowman" />
      </Router>
    );

    const bannerMessage = getByText(
      'snowman님, 오늘의 투자노트를 작성해보세요!'
    );
    expect(bannerMessage).toBeInTheDocument();
  });

  it('proper link url', () => {
    const { getByRole } = render(
      <Router>
        <CreateNoteBanner nickname="snowman" />
      </Router>
    );

    const today = moment(Date.now()).format('YYYYMMDD');
    const bannerLink = getByRole('link');
    expect(bannerLink).toHaveAttribute('href', `/create/note/${today}`);
  });
});

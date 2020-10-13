import React from 'react';
import { render } from '@testing-library/react';
import CreateNoteButton from './CreateNoteButton';

describe('<CreateNoteButton />', () => {
  it('render component', () => {
    const { getByText } = render(<CreateNoteButton />);

    const button = getByText('투자노트 작성');
    expect(button).toBeInTheDocument();
  });
});

import React, { useState } from 'react';
import { render, cleanup } from '@testing-library/react';
import NoteList from './NoteList';
import dummyData from '../../static/dummyData';

afterEach(cleanup);

const NoteListComponent = () => {
  const [selected, setSelected] = useState('');

  const onClickNote = (id: string) => {
    if (selected === id) {
      setSelected('');
    } else {
      setSelected(id);
    }
  };

  return (
    <NoteList notes={dummyData} selected={selected} onClickNote={onClickNote} />
  );
};

describe('<NoteList />', () => {
  it('render component', () => {
    const { getByText } = render(<NoteListComponent />);

    const listHeader = getByText('투자노트 목록');
    const listItem = getByText('2020-10-01 (목)');

    expect(listHeader).toBeInTheDocument();
    expect(listItem).toBeInTheDocument();
  });
});

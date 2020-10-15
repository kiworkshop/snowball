import React, { useState } from 'react';
import { cleanup, render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import moment from 'moment';
import dummyData from '../../static/dummyData';
import routes from '../../routes';

import CreateNoteBanner from './CreateNoteBanner';
import Editor from './Editor';
import NoteList from './NoteList';
import Note from './Note';

afterEach(cleanup);

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

    expect(bannerLink).toHaveAttribute('href', routes.note.create(today));
  });
});

const EditorComponent = () => {
  const [value, setValue] = useState('');
  const today = moment(Date.now()).format('YYYYMMDD');
  const onSave = () => console.log('saved');

  return (
    <Editor
      value={value}
      setValue={setValue}
      noteDate={today}
      onSave={onSave}
    />
  );
};

describe('<Editor />', () => {
  it('render component', () => {
    const { getByText } = render(<EditorComponent />);

    const today = moment(Date.now()).format('YYYY-MM-DD');

    const noteTitle = getByText(`${today} 투자노트`);
    const saveButton = getByText('저장하기');

    expect(noteTitle).toBeInTheDocument();
    expect(saveButton).toBeInTheDocument();
  });
});

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

describe('<Note />', () => {
  it('render component', () => {
    const note = dummyData[0];

    const { getByText } = render(<Note note={note} />);
    const noteTitle = getByText(`${note.investmentDate} 투자노트`);
    const noteText = getByText(note.text);

    expect(noteTitle).toBeInTheDocument();
    expect(noteText).toBeInTheDocument();
  });
});

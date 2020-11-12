import React, { useState } from 'react';
import { cleanup, render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import moment from 'moment';
import dummyData from '../../static/dummyData';
import routes from '../../routes';

import Editor from './Editor';
import EditorContainer from '../../container/note/EditorContainer';
import NoteList from './NoteList';
import Note from './Note';

afterEach(cleanup);

const EditorComponent = () => {
  const [value, setValue] = useState('');
  const today = moment(Date.now()).format('YYYYMMDD');
  const onSave = () => console.log('saved');

  return (
    <Editor
      noteInfo={value}
      setValue={setValue}
      noteDate={today}
      onSave={onSave}
    />
  );
};

describe('<Editor />', () => {
  it('render component in create page', () => {
    const { getByText } = render(<EditorComponent />);

    const today = moment(Date.now()).format('YYYY-MM-DD');

    const noteTitle = getByText(`${today} 투자노트`);
    const saveButton = getByText('저장하기');

    expect(noteTitle).toBeInTheDocument();
    expect(saveButton).toBeInTheDocument();
  });

  it('render component in update page', () => {
    const { getByText } = render(
      <EditorContainer date="20201016" initialValue="initial value" />
    );

    const noteContent = getByText('initial value');

    expect(noteContent).toBeInTheDocument();
  });
});

describe('<NoteList />', () => {
  it('render component', () => {
    const { getByText } = render(
      <NoteList notes={dummyData} onClick={() => console.log('click')} />
    );

    const listHeader = getByText('투자노트 목록');
    const listItem = getByText('2020-10-01 (목) 투자노트');

    expect(listHeader).toBeInTheDocument();
    expect(listItem).toBeInTheDocument();
  });
});

describe('<Note />', () => {
  it('render component', () => {
    const note = dummyData[0];

    const { getByText } = render(
      <Note
        note={note}
        onClickUpdateButton={() => console.log('update')}
        onClickDeleteButton={() => console.log('delete')}
      />
    );
    const noteTitle = getByText(`${note.investmentDate} 투자노트`);
    const noteText = getByText(note.text);

    expect(noteTitle).toBeInTheDocument();
    expect(noteText).toBeInTheDocument();
  });
});

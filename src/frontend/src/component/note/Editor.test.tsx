import React, { useState } from 'react';
import { render } from '@testing-library/react';
import moment from 'moment';
import Editor from './Editor';

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

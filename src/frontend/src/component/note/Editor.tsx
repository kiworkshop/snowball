import React from 'react';
import styled from 'styled-components';
import { Button } from 'antd';
import moment from 'moment';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Container from '../../component/base/Container';

interface Props {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  noteDate: string;
  onSave: () => void;
}

const StyledContainer = styled(Container)`
  padding-top: 50px;
`;

const NoteDate = styled.h1`
  font-size: 2rem;
`;

const StyledEditor = styled(ReactQuill)`
  .ql-editor {
    min-height: 500px;
  }
`;

const SaveButton = styled(Button)`
  float: right;
  margin-top: 30px;
`;

const Editor: React.FC<Props> = ({ value, setValue, noteDate, onSave }) => {
  const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],

    [{ header: 1 }, { header: 2 }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ script: 'sub' }, { script: 'super' }],
    [{ indent: '-1' }, { indent: '+1' }],
    [{ direction: 'rtl' }],

    [{ size: ['small', false, 'large', 'huge'] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }],
    [{ font: [] }],
    [{ align: [] }],

    ['clean'],
  ];

  return (
    <StyledContainer>
      <NoteDate>{moment(noteDate).format('YYYY-MM-DD')} 투자노트</NoteDate>
      <StyledEditor
        theme="snow"
        value={value}
        onChange={setValue}
        modules={{ toolbar: toolbarOptions }}
      />
      <SaveButton size="large" block onClick={onSave}>
        저장하기
      </SaveButton>
    </StyledContainer>
  );
};

export default Editor;

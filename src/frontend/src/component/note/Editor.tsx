import React from 'react';
import styled from 'styled-components';
import { Button, Alert, Typography, Spin } from 'antd';
import ReactQuill from 'react-quill';

import 'react-quill/dist/quill.snow.css';
import { Note } from '../../type/note';

interface EditorProps {
  noteInfo: Note.NoteForm;
  setValue: (value: string) => void;
  onSave: () => void;
  loading: boolean;
  error: string;
  onAlertClose: () => void;
}

const StyledEditor = styled(ReactQuill)`
  margin-bottom: 30px;

  .ql-editor {
    min-height: 500px;
  }
`;

const { Title } = Typography;

const Editor: React.FC<EditorProps> = ({
  noteInfo,
  setValue,
  onSave,
  loading,
  error,
  onAlertClose,
}) => {
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
    <>
      <Title>{noteInfo.investmentDate} 투자노트</Title>
      <StyledEditor
        theme="snow"
        value={noteInfo.text}
        onChange={setValue}
        modules={{ toolbar: toolbarOptions }}
      />

      {error ? (
        <Alert message={error} type="error" closable onClose={onAlertClose} />
      ) : (
        <Spin tip="저장중..." spinning={loading}>
          <Button size="large" block onClick={onSave}>
            저장하기
          </Button>
        </Spin>
      )}
    </>
  );
};

export default Editor;

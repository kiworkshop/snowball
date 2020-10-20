import React from 'react';
import styled from 'styled-components';
import { Button, Alert, Typography } from 'antd';
import ReactQuill from 'react-quill';

import 'react-quill/dist/quill.snow.css';

interface EditorProps {
  value: string;
  setValue: (value: string) => void;
  investmentDate: string;
  onSave: () => void;
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
  value,
  setValue,
  investmentDate,
  onSave,
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
      <Title>{investmentDate} 투자노트</Title>
      <StyledEditor
        theme="snow"
        value={value}
        onChange={setValue}
        modules={{ toolbar: toolbarOptions }}
      />

      {error && (
        <Alert message={error} type="error" closable onClose={onAlertClose} />
      )}

      {!error && (
        <Button size="large" block onClick={onSave}>
          저장하기
        </Button>
      )}
    </>
  );
};

export default Editor;

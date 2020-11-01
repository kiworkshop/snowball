import React from 'react';
import styled from 'styled-components';
import { Button, Alert, Typography, Spin } from 'antd';
import ReactQuill from 'react-quill';

import 'react-quill/dist/quill.snow.css';
import { Note } from '../../type/note';

interface EditorProps {
  formData: Note.Form;
  setContent: (content: string) => void;
  onSave: () => void;
  loading: boolean;
  error: Error | null;
}

const StyledEditor = styled(ReactQuill)`
  margin-bottom: 30px;

  .ql-editor {
    min-height: 500px;
  }
`;

const { Title } = Typography;

const Editor: React.FC<EditorProps> = ({
  formData,
  setContent,
  onSave,
  loading,
  error,
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
      <Title>{formData.investmentDate} 투자노트</Title>
      <StyledEditor
        theme="snow"
        value={formData.content}
        onChange={setContent}
        modules={{ toolbar: toolbarOptions }}
      />

      {error && <Alert message={error} type="error" closable />}

      <Spin tip="저장중..." spinning={loading}>
        <Button size="large" block onClick={onSave}>
          저장하기
        </Button>
      </Spin>
    </>
  );
};

export default Editor;

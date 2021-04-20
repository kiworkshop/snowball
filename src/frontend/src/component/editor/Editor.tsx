import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import ReactQuill from 'react-quill';
import { Button, Spin, Input, DatePicker } from 'antd';
import * as Color from '../../constants/colors';
import * as Type from '../../types';
import 'react-quill/dist/quill.snow.css';
import StockTransactionAddButtonContainer from '../../container/editor/StockTransactionAddButtonContainer';
import StockTransactionTableContainer from '../../container/editor/StockTransactionTableContainer';

interface EditorProps {
  form: {
    title: string;
    content: string;
    investmentDate: string;
  };
  onTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onContentChange: (content: string) => void;
  onInvestmentDateChange: (_: any, investmentDate: string) => void;
  onSave: () => void;
  loading: boolean;
  profile: Type.Profile;
  quillEditorRef: React.MutableRefObject<ReactQuill | null>;
}

const Container = styled.div`
  background-color: ${Color.WHITE};
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
  padding: 30px;
`;

const TitleInput = styled(Input)`
  font-size: 38px;
  font-weight: bold;
  padding: 0;
`;

const DatePickerBlock = styled.div`
  align-items: center;
  display: flex;
  padding: 20px 0;
`;

const DatePickerTitle = styled.h3`
  color: ${Color.BLACK};
  font-size: 0.9rem;
  margin: 0 15px 0 0;
`;

const QuillEditor = styled(ReactQuill)`
  margin-bottom: 30px;

  .ql-editor {
    min-height: 500px;
  }
`;

const StockTransactionBlock = styled.div`
  margin: 20px 0;
`;

const Editor: React.FC<EditorProps> = ({
  form,
  onTitleChange,
  onContentChange,
  onInvestmentDateChange,
  onSave,
  loading,
  profile,
  quillEditorRef,
}) => {
  const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ size: ['small', false, 'large', 'huge'] }],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
    ['clean'],
  ];

  return (
    <Container>
      <TitleInput
        type="text"
        value={form.title}
        bordered={false}
        placeholder={`${profile.name}님의 투자노트`}
        onChange={onTitleChange}
      />

      <DatePickerBlock>
        <DatePickerTitle>투자노트 날짜: </DatePickerTitle>
        <DatePicker defaultValue={moment(Date.now())} allowClear={false} onChange={onInvestmentDateChange} />
      </DatePickerBlock>

      <StockTransactionBlock>
        <StockTransactionAddButtonContainer type="BUY" />
        <StockTransactionTableContainer type="BUY" />
      </StockTransactionBlock>

      <StockTransactionBlock>
        <StockTransactionAddButtonContainer type="SELL" />
        <StockTransactionTableContainer type="SELL" />
      </StockTransactionBlock>

      <QuillEditor
        theme="snow"
        value={form.content}
        onChange={onContentChange}
        modules={{ toolbar: toolbarOptions }}
        ref={quillEditorRef}
      />

      <Spin tip="저장중..." spinning={Boolean(loading)}>
        <Button size="large" block onClick={onSave}>
          저장하기
        </Button>
      </Spin>
    </Container>
  );
};

export default Editor;

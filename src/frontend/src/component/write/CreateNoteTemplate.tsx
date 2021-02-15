import React from 'react';
import moment from 'moment';
import styled from 'styled-components';
import { DatePicker, Input } from 'antd';
import Colors from '../../constants/colors';
import EditorContainer from '../../container/write/EditorContainer';
import StockTransactionAddButtonContainer from '../../container/write/StockTransactionAddButtonContainer';
import StockTransactionTableContainer from '../../container/write/StockTransactionTableContainer';

const CreateNoteTemplateBlock = styled.div`
  background: ${Colors.$white};
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
  color: ${Colors.$black};
  font-size: 0.9rem;
  margin: 0 15px 0 0;
`;

const StockTransactionBlock = styled.div`
  margin: 20px 0;
`;

interface CreateNoteTemplateProps {
  form: {
    title: string;
    content: string;
    investmentDate: string;
  };
  onTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDateChange: (_: any, dateString: string) => void;
  onContentChange: (content: string) => void;
  onSave: () => void;
  loading: boolean;
}

const CreateNoteTemplate: React.FC<CreateNoteTemplateProps> = ({
  form,
  loading,
  onTitleChange,
  onDateChange,
  onContentChange,
  onSave,
}) => {
  return (
    <CreateNoteTemplateBlock>
      <TitleInput
        type="text"
        value={form.title}
        bordered={false}
        placeholder={`${form.investmentDate} 투자노트`}
        onChange={onTitleChange}
      />

      <DatePickerBlock>
        <DatePickerTitle>투자노트 날짜: </DatePickerTitle>
        <DatePicker
          defaultValue={moment(Date.now())}
          allowClear={false}
          onChange={onDateChange}
        />
      </DatePickerBlock>

      <StockTransactionBlock>
        <StockTransactionAddButtonContainer type="BUY" />
        <StockTransactionTableContainer type="BUY" />
      </StockTransactionBlock>

      <StockTransactionBlock>
        <StockTransactionAddButtonContainer type="SELL" />
        <StockTransactionTableContainer type="SELL" />
      </StockTransactionBlock>

      <EditorContainer
        form={form}
        onChange={onContentChange}
        onSave={onSave}
        loading={loading}
      />
    </CreateNoteTemplateBlock>
  );
};

export default CreateNoteTemplate;

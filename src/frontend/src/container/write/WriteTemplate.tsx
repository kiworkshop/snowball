import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { DatePicker, Input, message } from 'antd';
import noteSlice from '../../features/note';
import stockTransactionSlice from '../../features/stockTransaction';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { noteSelector, stockTransactionSelector, userSelector } from '../../lib/selector';
import { parseStockTransactionRequests } from '../../lib/stockTransaction';
import { BLACK, WHITE } from '../../constants/colors';
import { CREATE_NOTE_TYPE, UPDATE_NOTE_TYPE } from '../../constants/write';
import { Note } from '../../types/domain/note';
import Editor from '../../component/write/Editor';
import StockTransactionTableContainer from './StockTransactionTableContainer';
import StockTransactionAddButtonContainer from './StockTransactionAddButtonContainer';

/**
 * type & interface
 */
interface WriteTemplateProps {
  type: typeof CREATE_NOTE_TYPE | typeof UPDATE_NOTE_TYPE;
  note?: Note;
}

/**
 * styled-components
 */
const WriteTemplateBlock = styled.div`
  background: ${WHITE};
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
  color: ${BLACK};
  font-size: 0.9rem;
  margin: 0 15px 0 0;
`;

const StockTransactionBlock = styled.div`
  margin: 20px 0;
`;

/**
 * Write Template Component
 * @param type
 * @param note
 */
const WriteTemplate: React.FC<WriteTemplateProps> = ({ type, note }) => {
  /**
   * component state
   */
  const [title, setTitle] = useState(note ? note.title : '');
  const [content, setContent] = useState(note ? note.content : '');
  const [investmentDate, setInvestmentDate] = useState(
    note ? note.investmentDate : moment(Date.now()).format('YYYY-MM-DD')
  );

  let quillEditor = useRef<Element | null>(null);

  /**
   * redux store
   */
  const dispatch = useAppDispatch();
  const noteActions = noteSlice.actions;
  const stockTransactionActions = stockTransactionSlice.actions;
  const { profile } = useAppSelector(userSelector);
  const { loading } = useAppSelector(noteSelector);
  const { BUY, SELL } = useAppSelector(stockTransactionSelector);
  const stockTransactions = BUY.concat(SELL);

  /**
   * functions
   */
  const onTitleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  }, []);

  const onContentChange = useCallback((content: string) => {
    setContent(content);
  }, []);

  const onInvestmentDateChange = useCallback((_, dateString: string) => {
    setInvestmentDate(dateString);
  }, []);

  const onSave = useCallback(() => {
    if (quillEditor.current?.textContent?.trim().length === 0 && stockTransactions.length === 0) {
      message.error('내용을 입력해 주세요.');
      return;
    }

    const formPayload = {
      title: title.trim().length === 0 ? `${profile.name}님의 투자노트` : title,
      content,
      investmentDate,
      stockTransactionRequests: stockTransactions.map(parseStockTransactionRequests),
    };

    if (type === CREATE_NOTE_TYPE) {
      dispatch(noteActions.createNoteRequest(formPayload));
    }

    if (type === UPDATE_NOTE_TYPE) {
      dispatch(noteActions.updateNoteRequest({ id: note!.id, form: formPayload }));
    }
  }, [dispatch, noteActions, title, content, investmentDate, stockTransactions, profile.name, note, type]);

  /**
   * 컴포넌트 언마운트 시 거래내역 초기화
   */
  useEffect(() => {
    quillEditor.current = document.querySelector('.ql-editor');

    return function cleanup() {
      dispatch(stockTransactionActions.initialize());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <WriteTemplateBlock>
      <TitleInput
        type="text"
        value={title}
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

      <Editor content={content} onChange={onContentChange} onSave={onSave} loading={loading.createNoteRequest} />
    </WriteTemplateBlock>
  );
};

export default WriteTemplate;

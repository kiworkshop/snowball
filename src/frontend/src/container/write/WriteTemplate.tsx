import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { DatePicker, Input, message } from 'antd';
import history from '../../lib/history';
import { BLACK, WHITE } from '../../constants/colors';
import { CREATE_NOTE_TYPE, UPDATE_NOTE_TYPE } from '../../constants/write';
import * as Type from '../../types';
import Editor from '../../component/write/Editor';
import StockTransactionTableContainer from './StockTransactionTableContainer';
import StockTransactionAddButtonContainer from './StockTransactionAddButtonContainer';
import {
  useAppDispatch,
  useNoteAction,
  useNoteState,
  useStockTransactionAction,
  useStockTransactionState,
  useUserState,
} from '../../hooks';

interface WriteTemplateProps {
  type: typeof CREATE_NOTE_TYPE | typeof UPDATE_NOTE_TYPE;
  note?: Type.Note;
}

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

const WriteTemplate: React.FC<WriteTemplateProps> = ({ type, note }) => {
  const [title, setTitle] = useState(note ? note.title : '');
  const [content, setContent] = useState(note ? note.content : '');
  const [investmentDate, setInvestmentDate] = useState(
    note ? note.investmentDate : moment(Date.now()).format('YYYY-MM-DD')
  );

  const quillEditor = useRef<Element | null>(null);

  const dispatch = useAppDispatch();

  const { profile } = useUserState();
  const { loading } = useNoteState();
  const { BUY, SELL } = useStockTransactionState();
  const stockTransactions = BUY.concat(SELL);

  const noteActions = useNoteAction();
  const stockTransactionActions = useStockTransactionAction();

  const isEditing = useCallback(() => {
    return quillEditor.current?.textContent?.trim().length !== 0 || stockTransactions.length !== 0;
  }, [stockTransactions]);

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
    if (!isEditing()) {
      message.error('내용을 입력해 주세요.');
      return;
    }

    const formPayload = {
      title: title.trim().length === 0 ? `${profile.name}님의 투자노트` : title,
      content,
      investmentDate,
      stockTransactions,
    };

    if (type === CREATE_NOTE_TYPE) {
      dispatch(noteActions.createNoteRequest(formPayload));
    }

    if (type === UPDATE_NOTE_TYPE) {
      dispatch(noteActions.updateNoteRequest({ id: note!.id, form: formPayload }));
    }
  }, [isEditing, dispatch, noteActions, title, content, investmentDate, stockTransactions, profile.name, note, type]);

  window.onbeforeunload = (e: BeforeUnloadEvent) => {
    // 글이 작성 중일 경우
    if (isEditing()) {
      e.preventDefault();
      e.returnValue = '';
    }
  };

  /**
   * 컴포넌트 언마운트 시 거래내역 초기화
   */
  useEffect(() => {
    quillEditor.current = document.querySelector('.ql-editor');

    return () => {
      dispatch(stockTransactionActions.initialize());
      window.onbeforeunload = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const unblock = history.block(() => {
      if (isEditing()) {
        return '노트 작성중입니다. 정말 나가시겠습니까?';
      }
    });

    return () => unblock();
  }, [isEditing]);

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

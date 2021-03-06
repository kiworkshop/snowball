import React, { useCallback, useEffect, useState } from 'react';
import moment from 'moment';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { noteSelector, stockTransactionSelector } from '../../lib/selector';
import noteSlice from '../../features/note';
import stockTransactionSlice from '../../features/stockTransaction';
import CreateNoteTemplate from '../../component/write/CreateNoteTemplate';
import { message } from 'antd';

const CreateNoteTemplateContainer = () => {
  /**
   * component state
   */
  const [form, setForm] = useState({
    title: '',
    content: '',
    investmentDate: moment(Date.now()).format('YYYY-MM-DD'),
  });

  const onTitleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm({
        ...form,
        title: e.target.value,
      });
    },
    [form, setForm]
  );

  const onDateChange = useCallback(
    (_, dateString: string) => {
      setForm({
        ...form,
        investmentDate: dateString,
      });
    },
    [form, setForm]
  );

  const onContentChange = useCallback(
    (content: string) => {
      setForm({ ...form, content });
    },
    [form, setForm]
  );

  /**
   * redux store
   */
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector(noteSelector);
  const { BUY, SELL } = useAppSelector(stockTransactionSelector);
  const noteActions = noteSlice.actions;
  const stockTransactionActions = stockTransactionSlice.actions;
  const stockTransactions = BUY.concat(SELL);

  /**
   * functions
   */
  const onSave = useCallback(() => {
    if (form.content.trim().length === 0) {
      message.error('내용을 입력해 주세요.');
      return;
    }

    dispatch(
      noteActions.createNoteRequest({
        title: form.title || `${form.investmentDate} 투자노트`,
        content: form.content,
        investmentDate: form.investmentDate,
        stockTransactionRequests: stockTransactions.map((stockTransaction) => ({
          stockDetailId: stockTransaction.stockDetailId,
          quantity: stockTransaction.quantity,
          tradedPrice: stockTransaction.tradedPrice,
          transactionType: stockTransaction.transactionType,
        })),
      })
    );
  }, [dispatch, noteActions, form, stockTransactions]);

  useEffect(() => {
    return function cleanup() {
      dispatch(stockTransactionActions.initialize());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CreateNoteTemplate
      form={form}
      onTitleChange={onTitleChange}
      onDateChange={onDateChange}
      onContentChange={onContentChange}
      onSave={onSave}
      loading={loading.createNote}
    />
  );
};

export default CreateNoteTemplateContainer;

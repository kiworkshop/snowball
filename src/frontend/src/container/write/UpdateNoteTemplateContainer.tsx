import React, { useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import noteSlice from '../../features/note';
import stockTransactionSlice from '../../features/stockTransaction';
import { noteSelector, stockTransactionSelector } from '../../lib/selector';
import { Note } from '../../types/state/note';
import UpdateNoteTemplate from '../../component/write/UpdateNoteTemplate';

interface UpdateNoteTemplateContainerProps {
  id: number;
  note: Note;
}

const UpdateNoteTemplateContainer: React.FC<UpdateNoteTemplateContainerProps> = ({ id, note }) => {
  /**
   * component state
   */
  const [form, setForm] = useState({
    title: note.title,
    content: note.content,
    investmentDate: note.investmentDate.format('YYYY-MM-DD'),
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
  const stockTransactions = BUY.concat(SELL);
  const noteActions = noteSlice.actions;
  const stockTransactionActions = stockTransactionSlice.actions;

  /**
   * functions
   */
  const onSave = useCallback(
    () =>
      dispatch(
        noteActions.updateNoteRequest({
          id,
          form: {
            ...form,
            stockTransactions: stockTransactions.map((stockTransaction) => ({
              stockDetailId: stockTransaction.stockDetailId,
              quantity: stockTransaction.quantity,
              tradedPrice: stockTransaction.tradedPrice,
              transactionType: stockTransaction.transactionType,
            })),
          },
        })
      ),
    [dispatch, noteActions, form, stockTransactions, id]
  );

  // 노트 상태 캐싱
  useEffect(() => {
    setForm({
      title: note.title,
      content: note.content,
      investmentDate: note.investmentDate.format('YYYY-MM-DD'),
    });
  }, [id, note]);

  useEffect(() => {
    return function cleanup() {
      dispatch(stockTransactionActions.initialize());
    };
  }, [dispatch, stockTransactionActions]);

  return (
    <UpdateNoteTemplate
      form={form}
      onTitleChange={onTitleChange}
      onDateChange={onDateChange}
      onContentChange={onContentChange}
      onSave={onSave}
      loading={loading.updateNote}
    />
  );
};

export default UpdateNoteTemplateContainer;

import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/modules';
import { getNoteAsync, updateNoteAsync } from '../../store/modules/note';
import { Note } from '../../types/state/note';
import { initializeStockTransaction } from '../../store/modules/stockTransaction';
import UpdateNoteTemplate from '../../component/write/UpdateNoteTemplate';

interface UpdateNoteTemplateContainerProps {
  id: number;
  note: Note;
}

const UpdateNoteTemplateContainer: React.FC<UpdateNoteTemplateContainerProps> = ({
  id,
  note,
}) => {
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

  const { loading } = useSelector((state: RootState) => state.note);
  const stockTransactionsState = useSelector(
    (state: RootState) => state.stockTransaction
  );

  const stockTransactions = stockTransactionsState.BUY.concat(
    stockTransactionsState.SELL
  );

  const dispatch = useDispatch();
  const onSave = useCallback(
    () =>
      dispatch(
        updateNoteAsync.request({
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
    [dispatch, form, stockTransactions, id]
  );

  useEffect(() => {
    if (!note) {
      dispatch(getNoteAsync.request(id));
    } else {
      setForm({
        title: note.title,
        content: note.content,
        investmentDate: note.investmentDate.format('YYYY-MM-DD'),
      });
    }
  }, [dispatch, id, note]);

  useEffect(() => {
    return function cleanup() {
      dispatch(initializeStockTransaction());
    };
  }, [dispatch]);

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

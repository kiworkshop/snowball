import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { RootState } from '../../store/modules';
import { createNoteAsync } from '../../store/modules/note';
import { initializeStockTransaction } from '../../store/modules/stockTransaction';
import CreateNoteTemplate from '../../component/write/CreateNoteTemplate';

const CreateNoteTemplateContainer = () => {
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
        createNoteAsync.request({
          ...form,
          stockTransactions: stockTransactions.map((stockTransaction) => ({
            stockDetailId: stockTransaction.stockDetailId,
            quantity: stockTransaction.quantity,
            tradedPrice: stockTransaction.tradedPrice,
            transactionType: stockTransaction.transactionType,
          })),
        })
      ),
    [dispatch, form, stockTransactions]
  );

  useEffect(() => {
    return function cleanup() {
      dispatch(initializeStockTransaction());
    };
  }, [dispatch]);

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

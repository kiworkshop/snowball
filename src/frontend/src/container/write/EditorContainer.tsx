import React, { ChangeEvent, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/modules';

import Editor from '../../component/write/Editor';
import { setFormThunk } from '../../store/modules/note';

interface EditorContainerProps {
  onSave: () => void;
  loading: boolean;
  error: Error | null;
}

const EditorContainer: React.FC<EditorContainerProps> = ({
  onSave,
  loading,
  error,
}) => {
  const dispatch = useDispatch();

  const setContent = useCallback(
    (content: string) => dispatch(setFormThunk({ content })),
    [dispatch]
  );

  const { form } = useSelector((state: RootState) => state.note);

  const onClickStockTransactionButton = useCallback(
    (type: 'BUY' | 'SELL') => () =>
      dispatch(
        setFormThunk({
          stockTransactions: form.stockTransactions.concat({
            transactionType: type,
            quantity: 0,
            tradedPrice: 0,
            stockDetail: {
              companyName: '',
            },
          }),
        })
      ),
    [dispatch, form.stockTransactions]
  );

  const onChangeStockTransaction = useCallback(
    (index: number) => (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(
        setFormThunk({
          stockTransactions: form.stockTransactions.map(
            (stockTransaction, idx) => {
              if (idx !== index) return stockTransaction;
              return {
                ...stockTransaction,
                [e.target.name]: e.target.value,
              };
            }
          ),
        })
      );
    },
    [dispatch, form.stockTransactions]
  );

  return (
    <Editor
      formData={form}
      setContent={setContent}
      onSave={onSave}
      onClickStockTransactionButton={onClickStockTransactionButton}
      onChangeStockTransaction={onChangeStockTransaction}
      loading={loading}
      error={error}
    />
  );
};

export default EditorContainer;

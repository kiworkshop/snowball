import React, { useCallback } from 'react';
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

  const onSubmitStockTransactionForm = useCallback(
    (type: 'BUY' | 'SELL') => (values: any) => {
      dispatch(
        setFormThunk({
          stockTransactions: form.stockTransactions.concat([
            { ...values, transactionType: type },
          ]),
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
      onSubmitStockTransactionForm={onSubmitStockTransactionForm}
      loading={loading}
      error={error}
    />
  );
};

export default EditorContainer;

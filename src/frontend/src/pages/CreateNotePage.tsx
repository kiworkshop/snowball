import React, { useEffect } from 'react';
import { useAppDispatch, useStockTransactionAction, useWriteAction } from '../hooks';
import { CREATE_NOTE_TYPE } from '../constants/write';
import EditorContainer from '../container/editor/EditorContainer';

const CreateNotePage = () => {
  const dispatch = useAppDispatch();
  const stockTransactionAction = useStockTransactionAction();
  const writeAction = useWriteAction();

  useEffect(() => {
    dispatch(writeAction.initialize());
    dispatch(stockTransactionAction.initialize());
  }, [dispatch, writeAction, stockTransactionAction]);

  return <EditorContainer type={CREATE_NOTE_TYPE} />;
};

export default CreateNotePage;

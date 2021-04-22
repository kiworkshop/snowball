import React, { useCallback, useEffect } from 'react';
import { useAppDispatch, useNoteAction, useNoteState } from '../../hooks';
import history from '../../lib/history';
import routes from '../../routes';
import * as Type from '../../types';
import * as TransactionType from '../../constants/transactionType';
import NoteList from '../../component/main/NoteList';

const NoteListContainer = () => {
  const dispatch = useAppDispatch();
  const { notes, loading } = useNoteState();
  const noteAction = useNoteAction();

  const onClickUpdateNoteButton = useCallback(
    (noteId: number) => () => {
      history.push(routes.note.update(noteId));
    },
    []
  );

  const onDeleteNote = useCallback(
    (noteId: number) => () => {
      if (window.confirm('정말 삭제하시겠습니까?')) {
        dispatch(noteAction.deleteNoteRequest(noteId));
      }
    },
    [dispatch, noteAction]
  );

  const filterStockTransactions = useCallback((note: Type.Note) => {
    const buyType: Array<Type.StockTransaction> = [];
    const sellType: Array<Type.StockTransaction> = [];

    note.stockTransactions.forEach((s) =>
      s.transactionType === TransactionType.BUY ? buyType.push(s) : sellType.push(s)
    );

    return [buyType, sellType];
  }, []);

  useEffect(() => {
    dispatch(noteAction.getNotesRequest({ page: 0, size: 10 }));
  }, [dispatch, noteAction]);

  return (
    <NoteList
      loading={loading.getNotes}
      notes={notes}
      onClickUpdateNoteButton={onClickUpdateNoteButton}
      onDeleteNote={onDeleteNote}
      filterStockTransactions={filterStockTransactions}
    />
  );
};

export default NoteListContainer;

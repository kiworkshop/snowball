import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/store';
import noteSlice from '../features/note';
import stockTransactionSlice from '../features/stockTransaction';
import { noteSelector } from '../lib/selector';
import { UPDATE_NOTE_TYPE } from '../constants/write';
import WriteTemplate from '../container/write/WriteTemplate';

interface MatchProps {
  id: string;
}

const UpdateNotePage: React.FC<RouteComponentProps<MatchProps>> = ({ match }) => {
  const noteId = Number(match.params.id);

  /**
   * redux store
   */
  const dispatch = useAppDispatch();
  const { note: noteEntity } = useAppSelector(noteSelector);
  const note = noteEntity[noteId];
  const noteActions = noteSlice.actions;
  const stockTransactionActions = stockTransactionSlice.actions;

  useEffect(() => {
    if (!note) {
      dispatch(noteActions.getNoteRequest(noteId));
    } else {
      dispatch(stockTransactionActions.syncNote(note.stockTransactions));
    }
  }, [dispatch, noteActions, stockTransactionActions, note, noteId]);

  if (!note) {
    return null;
  }

  return <WriteTemplate type={UPDATE_NOTE_TYPE} note={note} />;
};

export default UpdateNotePage;

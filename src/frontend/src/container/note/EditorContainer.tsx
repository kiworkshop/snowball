import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { changeError, changeText, writeNote } from '../../store/modules/note';

import { RootState } from '../../store/modules';
import { NoteType } from '../../type/note';

import Editor from '../../component/note/Editor';

interface EditorContainerProps {
  note?: NoteType.Note;
}

const EditorContainer: React.FC<EditorContainerProps> = ({ note }) => {
  const dispatch = useDispatch();

  const setText = useCallback((value: string) => dispatch(changeText(value)), [
    dispatch,
  ]);

  const { noteForm, loading, error } = useSelector(
    (state: RootState) => state.note
  );

  const history = useHistory();

  const onSave = useCallback(() => {
    if (!note) {
      dispatch(writeNote(noteForm, history));
    }
  }, [dispatch, note, noteForm, history]);

  const onAlertClose = useCallback(() => {
    dispatch(changeError(''));
  }, [dispatch]);

  return (
    <Editor
      noteInfo={noteForm}
      setValue={setText}
      onSave={onSave}
      loading={loading}
      error={error}
      onAlertClose={onAlertClose}
    />
  );
};

export default EditorContainer;

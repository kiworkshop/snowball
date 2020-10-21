import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/modules';
import { addNote, updateNote } from '../../lib/api/note';
import routes from '../../routes';

import { NoteType } from '../../type/note';

import Editor from '../../component/note/Editor';
import { changeText } from '../../store/modules/note';

interface EditorContainerProps {
  note?: NoteType.Note;
}

const EditorContainer: React.FC<EditorContainerProps> = ({ note }) => {
  const dispatch = useDispatch();

  const setText = useCallback((value: string) => dispatch(changeText(value)), [
    dispatch,
  ]);
  const history = useHistory();

  const { noteForm } = useSelector((state: RootState) => state.note);
  const { userInfo } = useSelector((state: RootState) => state.user);
  const onSave = useCallback(async () => {
    try {
      const noteData = { ...noteForm, user: userInfo };

      let response;

      if (note) {
        response = await updateNote(note.id, noteData);
      } else {
        response = await addNote(noteData);
      }

      if (response.status === 200) {
        const { id: noteId } = response.data;
        history.push(routes.note.detail(noteId));
      } else {
        setError('저장하는 도중 오류가 발생했습니다.');
      }
    } catch (e) {
      console.log(e);
      setError('저장하는 도중 오류가 발생했습니다.');
    }
  }, [note, noteForm, history, userInfo]);

  const [error, setError] = useState('');
  const onAlertClose = useCallback(() => {
    setError('');
  }, []);

  return (
    <Editor
      value={noteForm.text}
      setValue={setText}
      investmentDate={noteForm.investmentDate}
      onSave={onSave}
      error={error}
      onAlertClose={onAlertClose}
    />
  );
};

export default EditorContainer;

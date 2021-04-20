import React, { useCallback, useEffect, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import moment from 'moment';
import { message } from 'antd';
import {
  useAppDispatch,
  useNoteAction,
  useNoteState,
  useStockTransactionState,
  useUserState,
  useWriteState,
} from '../../hooks';
import history from '../../lib/history';
import * as Type from '../../types';
import { CREATE_NOTE_TYPE, UPDATE_NOTE_TYPE } from '../../constants/write';
import Editor from '../../component/editor/Editor';

interface EditorContainerProps {
  type: typeof CREATE_NOTE_TYPE | typeof UPDATE_NOTE_TYPE;
  note?: Type.Note;
}

const EditorContainer: React.FC<EditorContainerProps> = ({ type, note }) => {
  const [form, setForm] = useState({
    title: note ? note.title : '',
    content: note ? note.content : '',
    investmentDate: note ? note.investmentDate : moment(Date.now()).format('YYYY-MM-DD'),
  });

  const quillEditorRef = useRef<ReactQuill | null>(null);

  const dispatch = useAppDispatch();
  const { profile } = useUserState();
  const { loading } = useNoteState();
  const { isWritingSucceeded } = useWriteState();
  const { BUY, SELL } = useStockTransactionState();
  const stockTransactions = BUY.concat(SELL);
  const noteAction = useNoteAction();

  const isEditing = useCallback(() => {
    if (isWritingSucceeded || !quillEditorRef.current) {
      return false;
    }

    return quillEditorRef.current.getEditor().getText().trim().length > 0 || stockTransactions.length > 0;
  }, [isWritingSucceeded, stockTransactions]);

  const onTitleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm({ ...form, title: e.target.value });
    },
    [form]
  );

  const onContentChange = useCallback(
    (content: string) => {
      setForm({ ...form, content });
    },
    [form]
  );

  const onInvestmentDateChange = useCallback(
    (_, investmentDate: string) => {
      setForm({ ...form, investmentDate });
    },
    [form]
  );

  const onSave = useCallback(() => {
    if (!isEditing()) {
      message.error('내용을 입력해 주세요.');
      return;
    }

    const formPayload = {
      ...form,
      title: form.title.trim().length === 0 ? `${profile.name}님의 투자노트` : form.title.trim(),
      stockTransactions,
    };

    if (type === CREATE_NOTE_TYPE) {
      dispatch(noteAction.createNoteRequest(formPayload));
    }

    if (type === UPDATE_NOTE_TYPE) {
      dispatch(noteAction.updateNoteRequest({ id: note!.id, form: formPayload }));
    }
  }, [isEditing, form, stockTransactions, profile, dispatch, noteAction, type, note]);

  window.onbeforeunload = (e: BeforeUnloadEvent) => {
    if (isEditing()) {
      e.preventDefault();
      e.returnValue = '';
    }
  };

  useEffect(() => {
    return () => {
      window.onbeforeunload = null;
    };
  }, []);

  useEffect(() => {
    const unblock = history.block(() => {
      if (isEditing()) {
        return '노트 작성중입니다. 정말 나가시겠습니까?';
      }
    });

    return () => unblock();
  }, [isEditing]);

  return (
    <Editor
      form={form}
      onTitleChange={onTitleChange}
      onContentChange={onContentChange}
      onInvestmentDateChange={onInvestmentDateChange}
      onSave={onSave}
      loading={loading.createNote}
      profile={profile}
      quillEditorRef={quillEditorRef}
    />
  );
};

export default EditorContainer;

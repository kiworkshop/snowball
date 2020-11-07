import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { PageHeader } from 'antd';
import {
  setFormThunk,
  initializeFormThunk,
  createNoteThunk,
} from '../../store/modules/note';
import { RootState } from '../../store/modules';

import Container from '../../component/base/Container';
import EditorContainer from './EditorContainer';
import CalendarContainer from './CalendarContainer';

const CreateNoteTemplate = () => {
  const dispatch = useDispatch();
  const [isDateSelected, setIsDateSelected] = useState(false);

  const {
    form,
    loading: { createNote: loading },
    error: { createNote: error },
  } = useSelector((state: RootState) => state.note);

  const onSave = useCallback(() => {
    dispatch(createNoteThunk(form));
  }, [dispatch, form]);

  const TODAY = useMemo(() => moment(Date.now()), []);

  useEffect(() => {
    dispatch(setFormThunk({ investmentDate: TODAY }));

    return function cleanup() {
      dispatch(initializeFormThunk());
    };
  }, [dispatch, TODAY]);

  return (
    <Container style={{ padding: '50px 0' }}>
      {isDateSelected && (
        <>
          <PageHeader
            title="날짜 수정하기"
            subTitle={form.investmentDate?.format('YYYY-MM-DD')}
            onBack={() => setIsDateSelected(false)}
            style={{ padding: 0 }}
          />
          <EditorContainer loading={!!loading} error={error} onSave={onSave} />
        </>
      )}

      {!isDateSelected && (
        <CalendarContainer setIsDateSelected={setIsDateSelected} />
      )}
    </Container>
  );
};

export default CreateNoteTemplate;

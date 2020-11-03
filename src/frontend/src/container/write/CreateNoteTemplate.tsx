import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { PageHeader } from 'antd';
import {
  setFormThunk,
  initializeFormThunk,
  createNoteThunk,
} from '../../store/modules/note';

import EditorContainer from './EditorContainer';
import Calendar from '../../component/write/Calendar';
import Container from '../../component/base/Container';
import { RootState } from '../../store/modules';

const CreateNoteTemplate = () => {
  const dispatch = useDispatch();
  const [isDateSelected, setIsDateSelected] = useState(false);

  const {
    form,
    form: { investmentDate },
    loading: { createNote: loading },
    error: { createNote: error },
  } = useSelector((state: RootState) => state.note);

  const setInvestmentDate = useCallback(
    (date: moment.Moment) => {
      dispatch(setFormThunk({ investmentDate: date }));
    },
    [dispatch]
  );

  const onSelectDate = useCallback(
    (selectedDate: moment.Moment) => {
      const prevYearAndMonth = investmentDate
        ? investmentDate.format('YYYY-MM')
        : null;
      const yearAndMonthOfSelectedDate = selectedDate.format('YYYY-MM');

      if (prevYearAndMonth === yearAndMonthOfSelectedDate) {
        setIsDateSelected(true);
      }
      setInvestmentDate(selectedDate);
    },
    [investmentDate, setInvestmentDate]
  );

  const onSave = useCallback(() => {
    dispatch(createNoteThunk(form));
  }, [dispatch, form]);

  const TODAY = useMemo(() => moment(Date.now()), []);

  useEffect(() => {
    setInvestmentDate(TODAY);

    return function cleanup() {
      dispatch(initializeFormThunk());
    };
  }, [dispatch, setInvestmentDate, TODAY]);

  return (
    <Container style={{ padding: '50px 0' }}>
      {isDateSelected && (
        <>
          <PageHeader
            title="날짜 수정하기"
            subTitle="투자노트 작성"
            onBack={() => setIsDateSelected(false)}
            style={{ padding: '0 0 25px 0' }}
          />
          <EditorContainer
            loading={loading ? true : false}
            error={error}
            onSave={onSave}
          />
        </>
      )}

      {!isDateSelected && (
        <Calendar
          onSelectDate={onSelectDate}
          currentDate={investmentDate ? investmentDate : TODAY}
        />
      )}
    </Container>
  );
};

export default CreateNoteTemplate;

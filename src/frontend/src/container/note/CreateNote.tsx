import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { PageHeader } from 'antd';
import {
  changeInvestmentDate,
  initializeNoteForm,
} from '../../store/modules/note';

import EditorContainer from './EditorContainer';
import Calendar from '../../component/note/Calendar';
import Container from '../../component/base/Container';
import { RootState } from '../../store/modules';

const CreateNote = () => {
  const dispatch = useDispatch();
  const [isDateSelected, setIsDateSelected] = useState(false);

  const setInvestmentDate = useCallback(
    (date: string) => {
      dispatch(changeInvestmentDate(date));
    },
    [dispatch]
  );

  const { investmentDate } = useSelector(
    (state: RootState) => state.note.noteForm
  );

  const onSelectDate = useCallback(
    (date: moment.Moment) => {
      const selectedDate = moment(date).format('YYYY-MM-DD');

      const prevYearAndMonth = investmentDate.slice(0, 7);
      const yearAndMonthOfSelectedDate = selectedDate.slice(0, 7);

      if (prevYearAndMonth === yearAndMonthOfSelectedDate) {
        setIsDateSelected(true);
      }
      setInvestmentDate(selectedDate);
    },
    [investmentDate, setInvestmentDate]
  );

  useEffect(() => {
    const TODAY = moment(Date.now()).format('YYYY-MM-DD');
    setInvestmentDate(TODAY);

    return function cleanup() {
      dispatch(initializeNoteForm());
    };
  }, [dispatch, setInvestmentDate]);

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
          <EditorContainer />
        </>
      )}

      {!isDateSelected && (
        <Calendar onSelectDate={onSelectDate} value={moment(investmentDate)} />
      )}
    </Container>
  );
};

export default CreateNote;

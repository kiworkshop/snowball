import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PageHeader, Space, Spin } from 'antd';
import { changeInvestmentDate } from '../../store/modules/note';
import { getNote } from '../../store/modules/note';

import Page404 from '../../pages/Page404';
import Container from '../../component/base/Container';
import Calendar from '../../component/note/Calendar';
import EditorContainer from './EditorContainer';
import ErrorPage from '../../pages/ErrorPage';
import NavContainer from '../base/NavContainer';
import { RootState } from '../../store/modules';
import moment from 'moment';

interface UpdateNoteProps {
  id: string;
}

const UpdateNote: React.FC<UpdateNoteProps> = ({ id }) => {
  const dispatch = useDispatch();

  const { loading, error, noteInfo } = useSelector(
    (state: RootState) => state.note
  );

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
    dispatch(getNote(id));
  }, [dispatch, id]);

  if (error === 'Not Found') {
    return <Page404 />;
  } else if (error) {
    return <ErrorPage />;
  }

  return (
    <>
      <NavContainer />
      <Container style={{ padding: '50px 0' }}>
        {loading ? (
          <Space
            align="center"
            style={{
              width: '100%',
              paddingTop: '100px',
              justifyContent: 'center',
            }}
          >
            <Spin size="large" tip="로딩중..." />
          </Space>
        ) : (
          noteInfo.id &&
          isDateSelected && (
            <>
              <PageHeader
                title="날짜 수정하기"
                subTitle="투자노트 수정"
                onBack={() => setIsDateSelected(false)}
                style={{ padding: '0 0 25px 0' }}
              />
              <EditorContainer initialNote={noteInfo} />
            </>
          )
        )}

        {noteInfo.id && !isDateSelected && (
          <Calendar
            defaultDate={noteInfo.investmentDate}
            onSelectDate={onSelectDate}
            value={moment(investmentDate)}
          />
        )}
      </Container>
    </>
  );
};

export default UpdateNote;

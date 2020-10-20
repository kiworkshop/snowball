import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { PageHeader } from 'antd';
import { changeInvestmentDate } from '../../store/modules/note';

import EditorContainer from './EditorContainer';
import DatePicker from '../../component/note/DatePicker';
import Container from '../../component/base/Container';

const CreateNote = () => {
  const dispatch = useDispatch();
  const [dateSelected, setDateSelected] = useState(false);

  const TODAY = moment(Date.now()).format('YYYY-MM-DD');
  const setInvestmentDate = useCallback(
    (date: string) => {
      dispatch(changeInvestmentDate(date));
    },
    [dispatch]
  );
  const onClick = useCallback(() => {
    setDateSelected(true);
  }, []);

  return (
    <Container style={{ padding: '50px 0' }}>
      {dateSelected && (
        <>
          <PageHeader
            title="날짜 수정하기"
            onBack={() => setDateSelected(false)}
            style={{ padding: '0 0 25px 0' }}
          />
          <EditorContainer />
        </>
      )}
      {!dateSelected && (
        <DatePicker
          initialDate={TODAY}
          onChange={setInvestmentDate}
          onClick={onClick}
        />
      )}
    </Container>
  );
};

export default CreateNote;

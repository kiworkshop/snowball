import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { Input, PageHeader } from 'antd';
import {
  setFormThunk,
  initializeFormThunk,
  createNoteThunk,
} from '../../store/modules/note';
import { RootState } from '../../store/modules';

import Container from '../../component/base/Container';
import EditorContainer from './EditorContainer';
import CalendarContainer from './CalendarContainer';
import StockTransactionContainer from './StockTransactionContainer';

const CreateNoteTemplate = () => {
  const dispatch = useDispatch();
  const [isDateSelected, setIsDateSelected] = useState(false);

  const {
    form,
    loading: { createNote: loading },
    error: { createNote: error },
  } = useSelector((state: RootState) => state.note);

  const onClickBackButton = () => setIsDateSelected(false);

  const onSave = useCallback(() => {
    dispatch(createNoteThunk(form));
  }, [dispatch, form]);

  const TODAY = useMemo(() => moment(Date.now()), []);
  const investmentDate = form.investmentDate?.format('YYYY-MM-DD');

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
            subTitle={investmentDate}
            onBack={onClickBackButton}
            style={{ padding: 0 }}
          />

          <Input
            type="text"
            bordered={false}
            placeholder={`${investmentDate} 투자노트`}
            style={{ fontSize: '38px', fontWeight: 'bold', padding: '20px 0' }}
          />

          <StockTransactionContainer />

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

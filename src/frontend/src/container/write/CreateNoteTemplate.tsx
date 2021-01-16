import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { Input, PageHeader } from 'antd';
import { RootState } from '../../store/modules';
import {
  createNoteAsync,
  initializeForm,
  setForm,
} from '../../store/modules/note';
import { $white } from '../../constants/colors';
import EditorContainer from './EditorContainer';
import CalendarContainer from './CalendarContainer';
import StockTransactionContainer from './StockTransactionContainer';

const CreateNoteTemplate = () => {
  const [isDateSelected, setIsDateSelected] = useState(false);

  const dispatch = useDispatch();
  const { form, loading } = useSelector((state: RootState) => state.note);

  const TODAY = useMemo(() => moment(Date.now()), []);
  const investmentDate = useMemo(
    () => form.investmentDate?.format('YYYY-MM-DD'),
    [form.investmentDate]
  );

  const onClickBackButton = useCallback(() => setIsDateSelected(false), [
    setIsDateSelected,
  ]);
  const onSave = useCallback(() => dispatch(createNoteAsync.request(form)), [
    dispatch,
    form,
  ]);

  const onTitleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setForm({ title: e.target.value }));
    },
    [dispatch]
  );

  useEffect(() => {
    dispatch(setForm({ investmentDate: TODAY }));

    return function cleanup() {
      dispatch(initializeForm());
    };
  }, [dispatch, TODAY]);

  return (
    <>
      {isDateSelected && (
        <div style={{ background: $white, padding: '30px' }}>
          <PageHeader
            title="날짜 수정하기"
            subTitle={investmentDate}
            onBack={onClickBackButton}
            style={{ padding: 0 }}
          />

          <Input
            type="text"
            value={form.title}
            bordered={false}
            placeholder={`${investmentDate} 투자노트`}
            style={{ fontSize: '38px', fontWeight: 'bold', padding: '20px 0' }}
            onChange={onTitleChange}
          />

          <StockTransactionContainer />

          <EditorContainer loading={!!loading.createNote} onSave={onSave} />
        </div>
      )}

      {!isDateSelected && (
        <CalendarContainer setIsDateSelected={setIsDateSelected} />
      )}
    </>
  );
};

export default CreateNoteTemplate;

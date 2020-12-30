import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input, PageHeader, Skeleton } from 'antd';
import styled from 'styled-components';
import { RootState } from '../../store/modules';
import { initializeForm, setForm, setFormForUpdateAsync, updateNoteAsync } from '../../store/modules/note';
import Page404 from '../../pages/Page404';
import EditorContainer from './EditorContainer';
import CalendarContainer from './CalendarContainer';
import StockTransactionContainer from './StockTransactionContainer';

interface UpdateNoteTemplateProps {
  id: number;
}


const UpdateNoteTemplateContainer = styled.div`
  background: #fff;
  padding: 30px;
`;


const StyledSkeleton = styled(Skeleton)`
  .ant-skeleton-paragraph li {
    height: 500px;
  }
`;


const UpdateNoteTemplate: React.FC<UpdateNoteTemplateProps> = ({ id }) => {
  const [isDateSelected, setIsDateSelected] = useState(true);

  const dispatch                 = useDispatch();
  const { form, loading, error } = useSelector((state: RootState) => state.note);

  const investmentDate = useMemo(() => form.investmentDate?.format('YYYY-MM-DD'), [form.investmentDate]);

  const onTitleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setForm({ title: e.target.value }));
    }, [dispatch]);

  const onSave = useCallback(() => {
    dispatch(updateNoteAsync.request({ id, form }));
  }, [dispatch, id, form]);

  useEffect(() => {
    dispatch(setFormForUpdateAsync.request(id));

    return function cleanup() {
      dispatch(initializeForm());
    };
  }, [dispatch, id]);

  if (error.setFormForUpdate) {
    return <Page404 />;
  }

  return (
    <UpdateNoteTemplateContainer>
      {isDateSelected && (
        <StyledSkeleton
          loading={loading.setFormForUpdate}
          active
          paragraph={{ rows: 1, width: '100%' }}
        >
          <PageHeader
            title="날짜 수정하기"
            subTitle={investmentDate}
            onBack={() => setIsDateSelected(false)}
            style={{ padding: '0' }}
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

          <EditorContainer
            loading={!!loading.updateNote}
            error={error.updateNote}
            onSave={onSave}
          />
        </StyledSkeleton>
      )}

      {!isDateSelected && (
        <CalendarContainer setIsDateSelected={setIsDateSelected} />
      )}
    </UpdateNoteTemplateContainer>
  );
};

export default UpdateNoteTemplate;

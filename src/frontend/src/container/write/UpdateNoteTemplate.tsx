import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input, PageHeader, Skeleton } from 'antd';
import styled from 'styled-components';

import { RootState } from '../../store/modules';
import {
  initializeForm,
  setForm,
  setFormForUpdateAsync,
  updateNoteAsync,
} from '../../store/modules/note';

import Page404 from '../../pages/Page404';
import Container from '../../component/base/Container';
import EditorContainer from './EditorContainer';
import CalendarContainer from './CalendarContainer';
import StockTransactionContainer from './StockTransactionContainer';

interface UpdateNoteTemplateProps {
  id: number;
}

const StyledSkeleton = styled(Skeleton)`
  .ant-skeleton-paragraph li {
    height: 500px;
  }
`;

const UpdateNoteTemplate: React.FC<UpdateNoteTemplateProps> = ({ id }) => {
  const dispatch = useDispatch();
  const [isDateSelected, setIsDateSelected] = useState(true);

  const { form, loading, error } = useSelector(
    (state: RootState) => state.note
  );

  const investmentDate = useMemo(
    () => form.investmentDate?.format('YYYY-MM-DD'),
    [form.investmentDate]
  );

  const onSave = useCallback(() => {
    dispatch(updateNoteAsync.request({ id, form }));
  }, [dispatch, id, form, investmentDate]);

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
    <Container style={{ padding: '50px 0' }}>
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
            bordered={false}
            placeholder={`${investmentDate} 투자노트`}
            style={{ fontSize: '38px', fontWeight: 'bold', padding: '20px 0' }}
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
    </Container>
  );
};

export default UpdateNoteTemplate;

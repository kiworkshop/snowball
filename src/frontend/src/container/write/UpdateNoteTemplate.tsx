import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input, PageHeader } from 'antd';
import {
  initializeFormThunk,
  updateNoteThunk,
  getNoteThunk,
  setFormThunk,
} from '../../store/modules/note';
import { RootState } from '../../store/modules';

import EditorContainer from './EditorContainer';
import CalendarContainer from './CalendarContainer';
import Container from '../../component/base/Container';
import { Page404 } from '../../pages';
import StockTransactionContainer from './StockTransactionContainer';

interface UpdateNoteTemplateProps {
  id: string;
}

const UpdateNoteTemplate: React.FC<UpdateNoteTemplateProps> = ({ id }) => {
  const dispatch = useDispatch();
  const [isDateSelected, setIsDateSelected] = useState(false);

  const { note, form, loading, error } = useSelector(
    (state: RootState) => state.note
  );

  const onSave = useCallback(() => {
    dispatch(updateNoteThunk(id, form));
  }, [dispatch, id, form]);

  const investmentDate = form.investmentDate?.format('YYYY-MM-DD');

  useEffect(() => {
    dispatch(getNoteThunk(id));
    dispatch(
      setFormThunk({
        content: note.content,
        investmentDate: note.investmentDate,
        stockTransactions: note.stockTransactions.map((stockTransaction) => ({
          id: stockTransaction.id,
          companyName: stockTransaction.stockDetail.companyName,
          transactionType: stockTransaction.transactionType,
          quantity: stockTransaction.quantity,
          tradedPrice: stockTransaction.tradedPrice,
        })),
      })
    );

    return function cleanup() {
      dispatch(initializeFormThunk());
    };
  }, [dispatch, id, note]);

  if (error.getNote) {
    return <Page404 />;
  }

  return (
    <Container style={{ padding: '50px 0' }}>
      {isDateSelected && (
        <>
          <PageHeader
            title="날짜 수정하기"
            subTitle={investmentDate}
            onBack={() => setIsDateSelected(false)}
            style={{ padding: '0 0 25px 0' }}
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
        </>
      )}

      {!isDateSelected && (
        <CalendarContainer setIsDateSelected={setIsDateSelected} />
      )}
    </Container>
  );
};

export default UpdateNoteTemplate;

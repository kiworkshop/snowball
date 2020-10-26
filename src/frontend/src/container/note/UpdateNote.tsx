import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PageHeader, Space, Spin } from 'antd';
import { changeInvestmentDate } from '../../store/modules/note';
import { getNote } from '../../store/modules/note';

import Page404 from '../../pages/Page404';
import Container from '../../component/base/Container';
import DatePicker from '../../component/note/DatePicker';
import EditorContainer from './EditorContainer';
import ErrorPage from '../../pages/ErrorPage';
import NavContainer from '../base/NavContainer';
import { RootState } from '../../store/modules';

interface UpdateNoteProps {
  id: string;
}

const UpdateNote: React.FC<UpdateNoteProps> = ({ id }) => {
  const dispatch = useDispatch();

  const { loading, error, noteInfo } = useSelector(
    (state: RootState) => state.note
  );

  const [dateSelected, setDateSelected] = useState(true);

  const setInvestmentDate = useCallback(
    (date: string) => {
      dispatch(changeInvestmentDate(date));
    },
    [dispatch]
  );

  const onSelectDate = useCallback(() => {
    setDateSelected(true);
  }, []);

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
          dateSelected && (
            <>
              <PageHeader
                title="날짜 수정하기"
                subTitle="투자노트 수정"
                onBack={() => setDateSelected(false)}
                style={{ padding: '0 0 25px 0' }}
              />
              <EditorContainer note={noteInfo} />
            </>
          )
        )}

        {noteInfo.id && !dateSelected && (
          <DatePicker
            initialDate={noteInfo.investmentDate}
            onChange={setInvestmentDate}
            onClick={onSelectDate}
          />
        )}
      </Container>
    </>
  );
};

export default UpdateNote;

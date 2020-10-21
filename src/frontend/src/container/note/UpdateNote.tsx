import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { PageHeader } from 'antd';
import { changeInvestmentDate } from '../../store/modules/note';
import { getNote } from '../../lib/api/note';

import Page404 from '../../pages/Page404';
import Container from '../../component/base/Container';
import DatePicker from '../../component/note/DatePicker';
import EditorContainer from './EditorContainer';
import ErrorPage from '../../pages/ErrorPage';
import NavContainer from '../base/NavContainer';

interface UpdateNoteProps {
  id: string;
}

const UpdateNote: React.FC<UpdateNoteProps> = ({ id }) => {
  const dispatch = useDispatch();

  const [dateSelected, setDateSelected] = useState(true);
  const [note, setNote] = useState({
    id: '',
    text: '',
    investmentDate: '',
    createdDate: '',
    lastModifiedDate: '',
  });
  const [error, setError] = useState<number | null>(null);

  const setInvestmentDate = useCallback(
    (date: string) => {
      dispatch(changeInvestmentDate(date));
    },
    [dispatch]
  );

  const onClick = useCallback(() => {
    setDateSelected(true);
  }, []);

  useEffect(() => {
    async function fetchNote() {
      try {
        const response = await getNote(id);

        if (response.status === 200) {
          setNote(response.data);
        } else if (response.status === 404) {
          setError(404);
        } else {
          setError(response.status);
        }
      } catch (e) {
        console.log(e);
        setError(500);
      }
    }

    fetchNote();
  }, [id]);

  if (error === 404) {
    return <Page404 />;
  }

  if (error && error !== 404) {
    return <ErrorPage />;
  }

  return (
    <>
      <NavContainer />
      <Container style={{ padding: '50px 0' }}>
        {dateSelected && (
          <>
            <PageHeader
              title="날짜 수정하기"
              onBack={() => setDateSelected(false)}
              style={{ padding: '0 0 25px 0' }}
            />
            <EditorContainer note={note} />
          </>
        )}

        {!dateSelected && (
          <DatePicker
            initialDate={note.investmentDate}
            onChange={setInvestmentDate}
            onClick={onClick}
          />
        )}
      </Container>
    </>
  );
};

export default UpdateNote;

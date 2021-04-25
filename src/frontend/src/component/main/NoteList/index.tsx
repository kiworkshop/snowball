import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import * as S from './styles';
import routes from '../../../routes';
import history from '../../../lib/history';
import useNotes from '../../../hooks/useNotes';
import useDeleteNote from '../../../hooks/useDeleteNote';
import StockTransaction from '../StockTransaction';

const NoteList = () => {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10); //TODO: 페이지 당 개수 조절 기능 추가

  const { isLoading, data } = useNotes(size, page - 1);
  const { mutate } = useDeleteNote();

  const onClickUpdateNoteButton = useCallback(
    (noteId: number) => () => {
      history.push(routes.note.update(noteId));
    },
    []
  );

  const onClickDeleteNoteButton = useCallback(
    (noteId: number) => () => {
      if (window.confirm('정말 삭제하시겠습니까?')) {
        mutate(noteId);
      }
    },
    [mutate]
  );

  const onChangePage = useCallback((page: number) => {
    setPage(page);
  }, []);

  return (
    <S.Container>
      <S.Title level={3}>투자노트 목록</S.Title>
      <S.List
        loading={isLoading}
        itemLayout="horizontal"
        dataSource={data ? data.content : []}
        renderItem={(note: any) => (
          <S.List.Item>
            <S.List.Item.Meta
              title={<Link to={routes.note.detail(note.id)}>{note.title}</Link>}
              description={moment(note.investmentDate).format('YYYY년 MM월 DD일')}
            />
            <StockTransaction stockTransactions={note.stockTransactions} investmentDate={note.investmentDate} />
            <S.Popover
              placement="topRight"
              trigger="click"
              content={
                <div>
                  <S.SmallButton type="link" onClick={onClickUpdateNoteButton(note.id)}>
                    수정
                  </S.SmallButton>
                  <S.SmallButton type="link" onClick={onClickDeleteNoteButton(note.id)}>
                    삭제
                  </S.SmallButton>
                </div>
              }
            >
              <S.MoreButton />
            </S.Popover>
          </S.List.Item>
        )}
      />

      {data && data.content && data.content.length > 0 && (
        <S.Pagination
          current={page}
          pageSize={size}
          total={data.numberOfElements}
          onChange={onChangePage}
          style={{ padding: '10px 0', textAlign: 'center' }}
        />
      )}
    </S.Container>
  );
};

export default NoteList;

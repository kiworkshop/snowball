import React, { useCallback, useEffect, useState } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import { message } from 'antd';
import * as S from './styles';
import routes from '../../../routes';
import history from '../../../lib/history';
import useNotes from '../../../hooks/useNotes';
import useDeleteNote from '../../../hooks/useDeleteNote';
import StockTransaction from '../StockTransaction';

const NoteList = () => {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10); //TODO: 페이지 당 개수 조절 기능 추가
  const [isPopoverVisible, setIsPopoverVisible] = useState<{ [idx: string]: boolean }>({});

  const queryClient = useQueryClient();
  const { isLoading, data } = useNotes(size, page - 1);
  const { mutate } = useDeleteNote();

  const onClickUpdateNoteButton = useCallback(
    (noteId: number) => () => {
      history.push(routes.note.update(noteId));
    },
    []
  );

  const onClickDeleteNoteButton = useCallback(
    (noteId: number, idx: number) => () => {
      setIsPopoverVisible({ ...isPopoverVisible, [idx.toString()]: false });
      if (window.confirm('정말 삭제하시겠습니까?')) {
        mutate(noteId, {
          onSuccess: async () => {
            await queryClient.invalidateQueries(['notes', { size, page }]);
            message.success('성공적으로 삭제되었습니다.');
          },
        });
      }
    },
    [mutate, page, size, queryClient, isPopoverVisible]
  );

  const onChangePage = useCallback((page: number) => {
    setPage(page);
  }, []);

  useEffect(() => {
    if (data && data.content && data.content.length === 0 && page > 1) {
      setPage(page - 1);
    }
  }, [data, page]);

  return (
    <S.Container>
      <S.Title level={3}>투자노트 목록</S.Title>
      <S.List
        loading={isLoading}
        itemLayout="horizontal"
        dataSource={data ? data.content : []}
        renderItem={(note: any, idx) => (
          <S.List.Item>
            <S.List.Item.Meta
              title={<Link to={routes.note.detail(note.id)}>{note.title}</Link>}
              description={moment(note.investmentDate).format('YYYY년 MM월 DD일')}
            />
            <StockTransaction stockTransactions={note.stockTransactions} investmentDate={note.investmentDate} />
            <S.Popover
              placement="topRight"
              trigger="click"
              visible={isPopoverVisible[idx.toString()]}
              onVisibleChange={(visible: boolean) =>
                setIsPopoverVisible({ ...isPopoverVisible, [idx.toString()]: visible })
              }
              content={
                <div>
                  <S.SmallButton type="link" onClick={onClickUpdateNoteButton(note.id)}>
                    수정
                  </S.SmallButton>
                  <S.SmallButton type="link" onClick={onClickDeleteNoteButton(note.id, idx)}>
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
        <S.Pagination current={page} pageSize={size} total={data.totalElements} onChange={onChangePage} />
      )}
    </S.Container>
  );
};

export default NoteList;

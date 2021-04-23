import React from 'react';
import { Link } from 'react-router-dom';
import { Button, List, Pagination, Popover, Typography } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import moment from 'moment';
import styled from 'styled-components';
import * as Color from '../../constants/colors';
import * as Type from '../../types';
import routes from '../../routes';
import StockTransaction from './StockTransaction';

interface NoteListProps {
  loading: boolean;
  notes: Array<Type.Note>;
  page: number;
  totalPages: number;
  onChangePage: (page: number) => void;
  onClickUpdateNoteButton: (noteId: number) => () => void;
  onClickDeleteNoteButton: (noteId: number) => () => void;
}

const Container = styled.div`
  background-color: ${Color.WHITE};
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
  padding: 20px;
`;

const Title = styled(Typography.Title)`
  color: ${Color.BLUE_2};
  margin-bottom: 30px !important;
`;

const MoreButton = styled(MoreOutlined)`
  font-size: 20px;
`;

const SmallButton = styled(Button)`
  padding: 4px 5px;
`;

const NoteList: React.VFC<NoteListProps> = ({
  loading,
  notes,
  page,
  totalPages,
  onChangePage,
  onClickUpdateNoteButton,
  onClickDeleteNoteButton,
}) => {
  return (
    <Container>
      <Title level={3}>투자노트 목록</Title>
      <List
        loading={loading}
        itemLayout="horizontal"
        dataSource={notes}
        renderItem={(note) => (
          <List.Item>
            <List.Item.Meta
              title={<Link to={routes.note.detail(note.id)}>{note.title}</Link>}
              description={moment(note.investmentDate).format('YYYY년 MM월 DD일')}
            />
            <StockTransaction stockTransactions={note.stockTransactions} investmentDate={note.investmentDate} />
            <Popover
              placement="topRight"
              trigger="click"
              content={
                <div>
                  <SmallButton type="link" onClick={onClickUpdateNoteButton(note.id)}>
                    수정
                  </SmallButton>
                  <SmallButton type="link" onClick={onClickDeleteNoteButton(note.id)}>
                    삭제
                  </SmallButton>
                </div>
              }
            >
              <MoreButton />
            </Popover>
          </List.Item>
        )}
      />
      {notes.length > 0 && (
        <Pagination
          current={page}
          pageSize={10}
          total={totalPages * 10}
          onChange={onChangePage}
          style={{ padding: '10px 0', textAlign: 'center' }}
        />
      )}
    </Container>
  );
};

export default NoteList;

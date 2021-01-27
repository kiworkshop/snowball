import React from 'react';
import { Popconfirm, Table, Typography } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { addCommaToNumber } from '../../lib/number';
import Colors from '../../constants/colors';

interface StockTransactionDataSource {
  index: number;
  companyName: string;
  quantity: string;
  tradedPrice: string;
  transactionAmount: string;
  transactionType: 'BUY' | 'SELL';
}

interface StockTransactionTableProps {
  type: 'BUY' | 'SELL';
  dataSource: Array<StockTransactionDataSource>;
  onDelete: (index: number) => () => void;
}

const StockTransactionTableWrapper = styled.div`
  overflow-x: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const CloseIcon = styled(CloseCircleOutlined)`
  color: ${Colors.$red};
`;

const StockTransactionTable: React.FC<StockTransactionTableProps> = ({
  type,
  dataSource,
  onDelete,
}) => {
  const columns = [
    { title: '종목', dataIndex: 'companyName', key: 'companyName' },
    { title: '수량(주)', dataIndex: 'quantity', key: 'quantity' },
    { title: '단가(원)', dataIndex: 'tradedPrice', key: 'tradedPrice' },
    {
      title: '거래금액(원)',
      dataIndex: 'transactionAmount',
      key: 'transactionAmount',
    },
    {
      title: '',
      dataIndex: 'delete',
      render: (_: any, item: StockTransactionDataSource) => (
        <Popconfirm
          title="정말 삭제하시겠습니까?"
          onConfirm={onDelete(item.index)}
        >
          <CloseIcon />
        </Popconfirm>
      ),
    },
  ];

  return (
    <StockTransactionTableWrapper>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        style={{ marginTop: '20px', padding: '0 15px', whiteSpace: 'nowrap' }}
        rowKey="index"
        summary={(pageData) => {
          let totalPrice = 0;

          pageData.forEach(({ transactionAmount }) => {
            totalPrice += Number(transactionAmount.replaceAll(',', ''));
          });

          return (
            <Table.Summary.Row>
              <Table.Summary.Cell index={0}>총 거래금액</Table.Summary.Cell>
              <Table.Summary.Cell index={1} />
              <Table.Summary.Cell index={2} />
              <Table.Summary.Cell index={3}>
                <Typography.Text type={type === 'BUY' ? 'success' : 'danger'}>
                  {addCommaToNumber(totalPrice)}
                </Typography.Text>
              </Table.Summary.Cell>
            </Table.Summary.Row>
          );
        }}
      />
    </StockTransactionTableWrapper>
  );
};

export default StockTransactionTable;

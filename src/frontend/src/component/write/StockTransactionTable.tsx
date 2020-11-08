import React from 'react';
import { Table, Typography } from 'antd';
import { addCommaToNumber } from '../../lib/transform';

interface StockTransactionTableProps {
  dataSource: Array<{
    companyName: string;
    quantity: string;
    tradedPrice: string;
    transactionAmount: string;
    transactionType: 'BUY' | 'SELL';
  }>;
  type: 'BUY' | 'SELL';
}

const { Text } = Typography;

const columns = [
  { title: '종목', dataIndex: 'companyName', key: 'companyName' },
  { title: '수량(주)', dataIndex: 'quantity', key: 'quantity' },
  { title: '단가(원)', dataIndex: 'tradedPrice', key: 'tradedPrice' },
  {
    title: '거래금액(원)',
    dataIndex: 'transactionAmount',
    key: 'transactionAmount',
  },
];

const StockTransactionTable: React.FC<StockTransactionTableProps> = ({
  dataSource,
  type,
}) => {
  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      pagination={false}
      style={{ marginTop: '20px', padding: '0 15px' }}
      summary={(pageData) => {
        let totalPrice = 0;

        pageData.forEach(({ transactionAmount }) => {
          totalPrice += Number(transactionAmount.replaceAll(',', ''));
        });

        return (
          <>
            <Table.Summary.Row>
              <Table.Summary.Cell index={0}>총 거래금액</Table.Summary.Cell>
              <Table.Summary.Cell index={1} />
              <Table.Summary.Cell index={2} />
              <Table.Summary.Cell index={3}>
                <Text type={type === 'BUY' ? 'success' : 'danger'}>
                  {addCommaToNumber(totalPrice)}
                </Text>
              </Table.Summary.Cell>
            </Table.Summary.Row>
          </>
        );
      }}
    />
  );
};

export default StockTransactionTable;

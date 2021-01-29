import React from 'react';
import { Table, Typography } from 'antd';
import { addCommaToNumber } from '../../lib/number';
import { Note } from '../../types/state/note';

interface StockTransactionTableProps {
  type: 'BUY' | 'SELL';
  note: Note;
}

const StockTransactionTable: React.FC<StockTransactionTableProps> = ({
  type,
  note,
}) => {
  const columns = [
    { title: '종목명', dataIndex: ['stockDetail', 'companyName'] },
    { title: '수량(주)', dataIndex: 'quantity' },
    { title: '단가(원)', dataIndex: 'tradedPrice' },
    { title: '거래금액(원)', dataIndex: 'transactionAmount' },
  ];

  const stockTransactionsOfType = note.stockTransactions
    .filter((stockTransaction) => stockTransaction.transactionType === type)
    .map((stockTransaction) => ({
      ...stockTransaction,
      quantity: addCommaToNumber(stockTransaction.quantity),
      tradedPrice: addCommaToNumber(stockTransaction.tradedPrice),
      transactionAmount: addCommaToNumber(
        stockTransaction.quantity * stockTransaction.tradedPrice
      ),
    }));

  return (
    <Table
      dataSource={stockTransactionsOfType}
      columns={columns}
      pagination={false}
      rowKey="id"
      style={{ marginBottom: '50px', whiteSpace: 'nowrap' }}
      summary={(data) => {
        let totalPrice = 0;

        data.forEach(({ transactionAmount }) => {
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
  );
};

export default StockTransactionTable;

import React from 'react';
import styled from 'styled-components';
import { Button, Modal, Table } from 'antd';
import * as TransactionType from '../../constants/transactionType';
import * as Type from '../../types';
import { addCommaToNumber } from '../../lib/number';

interface StockTransactionProps {
  stockTransactions: Array<Type.StockTransaction>;
  investmentDate: string;
}

const StockTransactionButton = styled(Button)`
  margin-right: 10px;
`;

const columns = [
  {
    title: '종목명',
    dataIndex: 'companyName',
    key: 'companyName',
  },
  {
    title: '거래량(주)',
    dataIndex: 'quantity',
    key: 'quantity',
  },
  {
    title: '1주당 가격(원)',
    dataIndex: 'tradedPrice',
    key: 'tradedPrice',
  },
  {
    title: '총 거래가(원)',
    dataIndex: 'totalPrice',
    key: 'totalPrice',
  },
];

const StockTransaction: React.VFC<StockTransactionProps> = ({ stockTransactions, investmentDate }) => {
  const transactionTypes: Array<Type.TransactionType> = [TransactionType.BUY, TransactionType.SELL];

  return (
    <div>
      {transactionTypes.map((type) => {
        const filteredStockTransactions = stockTransactions.filter((s) => s.transactionType === type);

        if (filteredStockTransactions.length === 0) {
          return null;
        }

        return (
          <React.Fragment key={type}>
            <StockTransactionButton
              danger={type === TransactionType.SELL}
              onClick={() =>
                Modal.info({
                  title: type === TransactionType.BUY ? `${investmentDate} 매수내역` : `${investmentDate} 매도내역`,
                  content: (
                    <Table
                      size="small"
                      style={{ marginTop: '20px' }}
                      columns={columns}
                      dataSource={filteredStockTransactions.map((s, idx) => ({
                        key: idx,
                        companyName: s.stockDetail.companyName,
                        quantity: addCommaToNumber(s.quantity),
                        tradedPrice: addCommaToNumber(s.tradedPrice),
                        totalPrice: addCommaToNumber(s.quantity * s.tradedPrice),
                      }))}
                      pagination={{ pageSize: 10, total: filteredStockTransactions.length }}
                    />
                  ),
                  onOk() {},
                  width: 900,
                })
              }
            >
              {type === TransactionType.BUY ? '매수 ' : '매도 '}
              {filteredStockTransactions.length}건
            </StockTransactionButton>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default StockTransaction;

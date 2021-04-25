import React from 'react';
import * as S from './styles';
import * as Type from '../../../types';
import { addCommaToNumber } from '../../../lib/number';
import usePortfolioSummary from '../../../hooks/usePortfolioSummary';

const columns = [
  {
    title: '종목명',
    dataIndex: 'companyName',
    key: 'companyName',
  },
  {
    title: '평균매수가',
    dataIndex: 'averageBuyingPrice',
    key: 'averageBuyingPrice',
  },
  {
    title: '목표가',
    dataIndex: 'targetPrice',
    key: 'targetPrice',
  },
  {
    title: '수익률',
    dataIndex: 'earningsRate',
    key: 'earningsRate',
  },
  {
    title: '목표수익률',
    dataIndex: 'targetEarningsRate',
    key: 'targetEarningsRate',
  },
];

const PortfolioSummary = () => {
  const { isLoading, data } = usePortfolioSummary();

  return (
    <S.Container>
      <S.Title level={3}>포트폴리오 요약</S.Title>
      <S.Table
        size="small"
        dataSource={
          data
            ? data.map((d: Type.PortfolioSummary) => ({
                ...d,
                averageBuyingPrice: addCommaToNumber(d.averageBuyingPrice),
                targetPrice: addCommaToNumber(d.targetPrice),
                key: d.companyName,
              }))
            : []
        }
        columns={columns}
        loading={isLoading}
        pagination={{ pageSize: 10 }}
      />
    </S.Container>
  );
};

export default PortfolioSummary;

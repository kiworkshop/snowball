import React from 'react';
import { Typography, Table as AntdTable } from 'antd';
import styled from 'styled-components';
import * as Color from '../../constants/colors';
import { addCommaToNumber } from '../../lib/number';

interface PortfolioSummaryProps {
  loading: boolean;
  portfolios: Array<{
    companyName: string;
    averageBuyingPrice: number;
    targetPrice: number;
    earningsRate: number;
    targetEarningsRate: number;
  }>;
}

const Container = styled.div`
  background: ${Color.WHITE};
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
  padding: 20px;
`;

const Title = styled(Typography.Title)`
  color: ${Color.BLUE_2};
  margin-bottom: 30px !important;
`;

const Table = styled(AntdTable)`
  * {
    text-align: center !important;
  }
`;

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

const PortfolioSummary: React.VFC<PortfolioSummaryProps> = ({ loading, portfolios }) => {
  return (
    <Container>
      <Title level={3}>포트폴리오 요약</Title>
      <Table
        size="small"
        dataSource={portfolios.map((p) => ({
          ...p,
          averageBuyingPrice: addCommaToNumber(p.averageBuyingPrice),
          targetPrice: addCommaToNumber(p.targetPrice),
          key: p.companyName,
        }))}
        columns={columns}
        loading={loading}
        pagination={{ pageSize: 10 }}
      />
    </Container>
  );
};

export default PortfolioSummary;

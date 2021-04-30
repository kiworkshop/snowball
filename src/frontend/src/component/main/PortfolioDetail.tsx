import React from 'react';
import { Typography, Table as AntdTable } from 'antd';
import styled from 'styled-components';
import * as Color from '../../constants/colors';
import * as Type from '../../types';
import { addCommaToNumber } from '../../lib/number';

interface PortfolioSummaryProps {
  loading: boolean;
  portfolioDetails: Array<Type.PortfolioDetail>;
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
    title: '보유수량',
    dataIndex: 'holdingQuantity',
    key: 'holdingQuantity',
  },
  {
    title: '매수금액',
    dataIndex: 'purchaseAmount',
    key: 'purchaseAmount',
  },
];

const PortfolioDetail: React.VFC<PortfolioSummaryProps> = ({ loading, portfolioDetails }) => {
  return (
    <Container>
      <Title level={3}>내 포트폴리오</Title>
      <Table
        size="small"
        dataSource={portfolioDetails.map((p) => ({
          ...p,
          averageBuyingPrice: addCommaToNumber(p.averageBuyingPrice),
          holdingQuantity: addCommaToNumber(p.holdingQuantity),
          purchaseAmount: addCommaToNumber(p.purchaseAmount),
          key: p.companyName,
        }))}
        columns={columns}
        loading={loading}
        pagination={{ pageSize: 10 }}
      />
    </Container>
  );
};

export default PortfolioDetail;

import React from 'react';
import { Typography, Empty } from 'antd';
import styled from 'styled-components';
import PortfolioSummaryRow from './PortfolioSummaryRow';
import { MAIN_COLOR } from '../../constants/colors';

interface PortfolioSummaryProps {
  portfolios: Array<{
    companyName: string;
    averageBuyingPrice: number;
    targetPrice: number;
    earningsRate: number;
    targetEarningsRate: number;
  }>;
}

const Wrapper = styled.div`
  background: #fff;
  border-radius: 16px;
  margin-bottom: 30px;
  padding: 20px;
`;

const TableTitle = styled(Typography.Title)`
  color: ${MAIN_COLOR};
  margin-bottom: 30px;
`;

const Table = styled.table`
  display: block;
  overflow-x: scroll;
  table-layout: fixed;
  width: 100%;

  &::-webkit-scrollbar {
    display: none;
  }

  thead,
  tbody {
    display: table;
    width: 100%;
  }
`;

const TableHeader = styled.thead`
  background: #27496d;
  border-bottom: 1px solid #d9d9d9;

  tr {
    display: flex;
    padding: 15px 0;
  }

  th {
    color: #fff;
    font-weight: bold;
    min-width: 100px;
    text-align: center;
    width: 20%;
  }
`;

const PortfolioSummary: React.FC<PortfolioSummaryProps> = ({ portfolios }) => {
  return (
    <Wrapper>
      <TableTitle level={3}>포트폴리오 요약</TableTitle>

      <Table>
        <TableHeader>
          <tr>
            <th>종목명</th>
            <th>평균매수가</th>
            <th>목표가</th>
            <th>수익률</th>
            <th>목표수익률</th>
          </tr>
        </TableHeader>

        <tbody>
          {portfolios.length > 0 &&
            portfolios.map((portfolio, index) => (
              <PortfolioSummaryRow key={index} portfolio={portfolio} />
            ))}
        </tbody>
      </Table>

      {portfolios.length === 0 && <Empty style={{ padding: '50px 0' }} />}
    </Wrapper>
  );
};

export default PortfolioSummary;

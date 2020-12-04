import React from 'react';
import { Typography, Pagination, Empty, Alert } from 'antd';
import styled from 'styled-components';

interface PortfolioSummaryProps {
  portfolios: Array<{
    companyName: string;
    averageBuyingPrice: number;
    targetPrice: number;
    earningsRate: number;
    targetEarningsRate: number;
  }>;
  page: number;
  onPageChange: (page: number) => void;
  error: Error | null;
}

interface PortfolioRowProps {
  portfolio: {
    companyName: string;
    averageBuyingPrice: number;
    targetPrice: number;
    earningsRate: number;
    targetEarningsRate: number;
  };
}

const PortfolioSummaryContainer = styled.div`
  background: #fff;
  border-radius: 16px;
  margin-bottom: 30px;
  padding: 20px;
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

const Row = styled.tr`
  border-bottom: 1px solid #d9d9d9;
  display: flex;
  min-width: 100%;
  padding: 15px 0;
  width: fit-content;

  & > td {
    color: #27496d;
    font-weight: bold;
    min-width: 100px;
    text-align: center;
    width: 20%;
  }
`;

const PaginationWrapper = styled.div`
  margin-top: 20px;
  text-align: right;
`;

const { Title } = Typography;

const PortfolioRow: React.FC<PortfolioRowProps> = ({ portfolio }) => {
  return (
    <Row>
      <td>{portfolio.companyName}</td>
      <td>{portfolio.averageBuyingPrice}</td>
      <td>{portfolio.targetPrice}</td>
      <td>{portfolio.earningsRate}</td>
      <td>{portfolio.targetEarningsRate}</td>
    </Row>
  );
};

const PortfolioSummary: React.FC<PortfolioSummaryProps> = ({
  portfolios,
  page,
  onPageChange,
  error,
}) => {
  return (
    <PortfolioSummaryContainer>
      <Title level={3} style={{ color: '#27496d', marginBottom: '30px' }}>
        포트폴리오 요약
      </Title>

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
              <PortfolioRow key={index} portfolio={portfolio} />
            ))}
        </tbody>
      </Table>

      {portfolios.length === 0 && <Empty style={{ padding: '50px 0' }} />}

      <PaginationWrapper>
        <Pagination
          total={portfolios.length}
          onChange={onPageChange}
          current={page}
          simple
        />
      </PaginationWrapper>

      {error && (
        <Alert
          message="Error"
          description="포트폴리오 요약 정보를 불러오는 중 오류가 발생했습니다."
          type="error"
          closable
          style={{ marginTop: '30px' }}
        />
      )}
    </PortfolioSummaryContainer>
  );
};

export default PortfolioSummary;

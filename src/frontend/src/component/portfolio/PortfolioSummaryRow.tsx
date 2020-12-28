import React from 'react';
import styled from 'styled-components';

interface PortfolioRowProps {
  portfolio: {
    companyName: string;
    averageBuyingPrice: number;
    targetPrice: number;
    earningsRate: number;
    targetEarningsRate: number;
  };
}


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


const PortfolioSummaryRow: React.FC<PortfolioRowProps> = ({ portfolio }) => {
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

export default PortfolioSummaryRow;

import React from 'react';

import PortfolioSummary from '../../component/portfolio/PortfolioSummary';

const dummyData = [
  {
    companyName: '삼성전자',
    averageBuyingPrice: 1000,
    targetPrice: 2000,
    earningsRate: 10.0,
    targetEarningsRate: 10.0,
  },
  {
    companyName: '삼성전자',
    averageBuyingPrice: 1000,
    targetPrice: 2000,
    earningsRate: 10.0,
    targetEarningsRate: 10.0,
  },
  {
    companyName: '삼성전자',
    averageBuyingPrice: 1000,
    targetPrice: 2000,
    earningsRate: 10.0,
    targetEarningsRate: 10.0,
  },
];

const PortfolioSummaryContainer = () => {
  return <PortfolioSummary portfolios={dummyData} />;
};

export default PortfolioSummaryContainer;

import React, { useEffect } from 'react';
import { useAppDispatch, usePortfolioAction, usePortfolioState } from '../../hooks';
import PortfolioSummary from '../../component/main/PortfolioSummary';

const PortfolioSummaryContainer = () => {
  const dispatch = useAppDispatch();
  const { portfolioSummaries, loading } = usePortfolioState();
  const portfolioAction = usePortfolioAction();

  useEffect(() => {
    dispatch(portfolioAction.getPortfolioSummariesRequest());
  }, [dispatch, portfolioAction]);

  return <PortfolioSummary loading={loading.getPortfolioSummaries} portfolios={portfolioSummaries} />;
};

export default PortfolioSummaryContainer;

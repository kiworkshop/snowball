import React, { useCallback, useEffect } from 'react';
import { useAppDispatch, usePortfolioAction, usePortfolioState } from '../../hooks';
import PortfolioSummary from '../../component/portfolio/PortfolioSummary';

const PortfolioSummaryContainer = () => {
  const dispatch = useAppDispatch();
  const { portfolioSummaries } = usePortfolioState();
  const portfolioActions = usePortfolioAction();

  const getPortfolioSummaries = useCallback(() => {
    dispatch(portfolioActions.getPortfolioSummariesRequest());
  }, [dispatch, portfolioActions]);

  useEffect(() => {
    getPortfolioSummaries();
  }, [getPortfolioSummaries]);

  return <PortfolioSummary portfolios={portfolioSummaries} />;
};

export default PortfolioSummaryContainer;

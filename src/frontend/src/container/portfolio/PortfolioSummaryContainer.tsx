import React, { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { portfolioSelector } from '../../lib/selector';
import PortfolioSummary from '../../component/portfolio/PortfolioSummary';
import portfolioSlice from '../../features/portfolio';

const PortfolioSummaryContainer = () => {
  /**
   * redux store
   */
  const dispatch = useAppDispatch();
  const { portfolioSummaries } = useAppSelector(portfolioSelector);
  const portfolioActions = portfolioSlice.actions;

  /**
   * functions
   */
  const getPortfolioSummaries = useCallback(() => {
    dispatch(portfolioActions.getPortfolioSummariesRequest());
  }, [dispatch, portfolioActions]);

  useEffect(() => {
    getPortfolioSummaries();
  }, [getPortfolioSummaries]);

  return <PortfolioSummary portfolios={portfolioSummaries} />;
};

export default PortfolioSummaryContainer;

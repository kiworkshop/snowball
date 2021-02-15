import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/modules';
import { getPortfolioSummariesAsync } from '../../store/modules/portfolio';
import PortfolioSummary from '../../component/portfolio/PortfolioSummary';

const PortfolioSummaryContainer = () => {
  const dispatch = useDispatch();
  const { portfolioSummaries } = useSelector(
    (state: RootState) => state.portfolio
  );

  const getPortfolioSummaries = useCallback(
    () => dispatch(getPortfolioSummariesAsync.request()),
    [dispatch]
  );

  useEffect(() => {
    getPortfolioSummaries();
  }, [getPortfolioSummaries]);

  return (
    <PortfolioSummary
      portfolios={portfolioSummaries}
    />
  );
};

export default PortfolioSummaryContainer;

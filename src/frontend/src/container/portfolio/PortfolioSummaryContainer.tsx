import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../store/modules';
import { getPortfolioSummariesAsync } from '../../store/modules/portfolio';

import PortfolioSummary from '../../component/portfolio/PortfolioSummary';

const PortfolioSummaryContainer = () => {
  const [page, setPage] = useState(1);

  const { id } = useSelector((state: RootState) => state.user.profile);
  const { portfolioSummaries, error } = useSelector(
    (state: RootState) => state.portfolio
  );

  const dispatch = useDispatch();

  const getPortfolioSummaries = useCallback(() => {
    dispatch(getPortfolioSummariesAsync.request({ id: id!, page }));
  }, [dispatch, id, page]);

  const onPageChange = useCallback((page: number) => {
    setPage(page);
  }, []);

  useEffect(() => {
    getPortfolioSummaries();
  }, [getPortfolioSummaries]);

  return (
    <PortfolioSummary
      portfolios={portfolioSummaries}
      page={page}
      onPageChange={onPageChange}
      error={error.getPortfolioSummaries}
    />
  );
};

export default PortfolioSummaryContainer;

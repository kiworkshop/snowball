import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/modules';
import { getPortfolioSummariesAsync } from '../../store/modules/portfolio';
import PortfolioSummary from '../../component/portfolio/PortfolioSummary';

const PortfolioSummaryContainer = () => {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const { id } = useSelector((state: RootState) => state.user.profile);
  const { portfolioSummaries, error } = useSelector(
    (state: RootState) => state.portfolio
  );

  const onPageChange = useCallback((page: number) => setPage(page), []);
  const getPortfolioSummaries = useCallback(
    () => dispatch(getPortfolioSummariesAsync.request({ id: id!, page })),
    [dispatch, id, page]
  );

  useEffect(() => {
    getPortfolioSummaries();
  }, [getPortfolioSummaries]);

  return (
    <PortfolioSummary
      page={page}
      onPageChange={onPageChange}
      portfolios={portfolioSummaries}
      error={error.getPortfolioSummaries}
    />
  );
};

export default PortfolioSummaryContainer;

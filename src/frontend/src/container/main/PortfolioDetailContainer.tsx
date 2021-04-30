import React, { useEffect } from 'react';
import { useAppDispatch, usePortfolioAction, usePortfolioState } from '../../hooks';
import PortfolioDetail from '../../component/main/PortfolioDetail';

const PortfolioDetailContainer = () => {
  const dispatch = useAppDispatch();
  const { portfolioDetails, loading } = usePortfolioState();
  const portfolioAction = usePortfolioAction();

  useEffect(() => {
    dispatch(portfolioAction.getPortfolioDetailRequest());
  }, [dispatch, portfolioAction]);

  return <PortfolioDetail loading={loading.getPortfolioDetail} portfolioDetails={portfolioDetails} />;
};

export default PortfolioDetailContainer;

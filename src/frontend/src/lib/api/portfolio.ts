import axios from 'axios';

export const getPortfolioSummaries = () => {
  return axios.get('/api/portfolio-summary');
};

export const getPortfolioDetail = () => {
  return axios.get('/api/portfolio-detail');
};

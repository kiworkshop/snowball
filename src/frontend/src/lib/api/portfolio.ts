import axios from 'axios';

const axiosClient = axios.create({
  baseURL: '/api/portfolio-summary',
});

export const getPortfolioSummaries = () => {
  return axiosClient.get('');
};

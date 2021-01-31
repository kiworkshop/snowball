import axios from 'axios';
import { PortfolioSummary } from '../../store/modules/portfolio';

const axiosClient = axios.create({
  // baseURL: 'http://develop.snowball.live/api/portfolio-summary',
  baseURL: 'http://localhost:8080/api/portfolio-summary'
});

export const getPortfolioSummaries = () => {
  return axiosClient.get<PortfolioSummary[]>('');
};

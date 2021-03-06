import axios from 'axios';
import { PortfolioResponse } from '../../types/response/portfolio';

const axiosClient = axios.create({
  baseURL: '/api/portfolio-summary',
});

export const getPortfolioSummaries = () => {
  return axiosClient.get<PortfolioResponse.GetSummaries>('');
};

import axios from 'axios';
import { PortfolioSummary } from '../../store/modules/portfolio';

const axiosClient = axios.create({
  baseURL: 'http://develop.snowball.live/portfolio-summary',
});

export const getPortfolioSummaries = (id: number, page: number) => {
  return axiosClient.get<PortfolioSummary[]>(`/${id}`, {
    params: { page },
  });
};

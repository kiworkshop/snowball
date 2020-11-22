import axiosClient from '../axiosClient';
import { PortfolioSummary } from '../../store/modules/portfolio';

export const getPortfolioSummaries = (id: number, page: number) =>
  axiosClient.get<PortfolioSummary[]>(`/portfolio-summary/${id}`, {
    params: { page },
  });

import axiosClient from '../axiosClient';

export const getSingleStockDetail = (companyName: string) =>
  axiosClient.get('/stockdetail', { params: { companyName } });

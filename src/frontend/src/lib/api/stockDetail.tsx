import axios from '../axios';

export const getSingleStockDetail = (companyName: string) =>
  axios.get('/stockdetail', { params: { companyName } });

import axios from 'axios';
import { StockDetailRequest } from '../../types/request/stockDetail';

const axiosClient = axios.create({
  baseURL: '/api/stockdetail',
});

export const getSingleStockDetail = (companyName: StockDetailRequest.GetSingle.companyName) => {
  return axiosClient.get('', { params: { companyName } });
};

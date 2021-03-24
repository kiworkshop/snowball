import axios from 'axios';

const axiosClient = axios.create({
  baseURL: '/api/stockdetail',
});

export const getSingleStockDetail = (companyName: string) => {
  return axiosClient.get('', { params: { companyName } });
};

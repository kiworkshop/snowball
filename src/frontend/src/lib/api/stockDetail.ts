import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://develop.snowball.live/api/stockdetail',
});

export const getSingleStockDetail = (companyName: string) => {
  return axiosClient.get('', { params: { companyName } });
};

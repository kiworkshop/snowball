import { AxiosRequestConfig } from 'axios';
import axios from './axios';

export default {
  GET: async (url: string, config?: AxiosRequestConfig | undefined) => {
    try {
      const response = await axios.get(url, config);
      return response.data;
    } catch (err) {
      console.error(err);
    }
  },
  POST: async (
    url: string,
    data?: any,
    config?: AxiosRequestConfig | undefined
  ) => {
    try {
      const response = await axios.post(url, data, config);
      return response.data;
    } catch (err) {
      console.error(err);
    }
  },
};

import { AxiosRequestConfig } from 'axios';
import axios from './axios';

export default {
  GET: async (url: string, config?: AxiosRequestConfig | undefined) => {
    return await axios.get(url, config);
  },
  POST: async (
    url: string,
    data?: any,
    config?: AxiosRequestConfig | undefined
  ) => {
    return await axios.post(url, data, config);
  },
};

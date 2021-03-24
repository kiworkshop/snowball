import axios from 'axios';

const axiosClient = axios.create({
  baseURL: '/api/notes',
});

export const getNotes = (size: number, page: number) => {
  return axiosClient.get(`?size=${size}&page=${page}`);
};

export const getNote = (id: number) => {
  return axiosClient.get(`/${id}`);
};

export const createNote = (form: Form) => {
  return axiosClient.post('', form);
};

export const updateNote = (id: number, form: Form) => {
  return axiosClient.put(`/${id}`, form);
};

export const deleteNote = (id: number) => {
  return axiosClient.delete(`/${id}`);
};

interface Form {
  title: string;
  content: string;
  investmentDate: string;
  stockTransactions: Array<{
    stockDetailId: number;
    quantity: number;
    tradedPrice: number;
    transactionType: 'BUY' | 'SELL';
  }>;
}

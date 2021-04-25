import { useQuery } from 'react-query';
import axios from 'axios';

const getPortfolioSummary = async () => {
  const { data } = await axios.get('/api/portfolio-summary');
  return data;
};

export default () => {
  return useQuery('portfolioSummary', getPortfolioSummary);
};

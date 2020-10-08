import async from '../async';

export const login = async () => {
  const data = await async.GET('/login');
  return data;
};

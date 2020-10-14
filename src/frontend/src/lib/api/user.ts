import async from '../async';

export const login = async () => {
  return await async.GET('/login');
};

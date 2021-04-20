import routes from '../routes';

const menuOfPath = {
  [routes.note.create]: 'createNote',
  [routes.portfolio.detail]: 'myPortfolio',
};

export const getSelectedMenu = (path: string) => {
  return menuOfPath[path] || '';
};

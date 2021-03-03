import routes from '../routes';

const pathToMenu = {
  [routes.home]: 'home',
  [routes.note.create]: 'createNote',
};

export const getSelectedMenu = (path: string) => {
  return pathToMenu[path] || '';
};

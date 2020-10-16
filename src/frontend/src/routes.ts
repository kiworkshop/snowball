export default {
  home: () => '/',
  login: () => '/login',
  note: {
    detail: (id: string) => `/note/${id}`,
    create: (date: string = '') => `/write/note/${date}`,
    update: (id: string) => `/update/note/${id}`,
    delete: (id: string) => `/delete/note/${id}`,
  },
};

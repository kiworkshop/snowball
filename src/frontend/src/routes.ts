export default {
  home: () => '/',
  login: () => '/login',
  note: {
    detail: (id: number) => `/note/${id}`,
    create: () => '/create/note',
    update: (id: number) => `/update/note/${id}`,
    delete: (id: number) => `/delete/note/${id}`,
  },
};

export default {
  home: () => '/',
  login: () => '/user/login',
  note: {
    detail: (id: number) => `/note/${id}`,
    create: () => '/create/note',
    update: (id: number) => `/update/note/${id}`,
    delete: (id: number) => `/delete/note/${id}`,
  },
  oauth2: {
    google: '/oauth2/authorization/google',
  },
};

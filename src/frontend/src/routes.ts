export default {
  home: '/',
  login: '/user/login',
  logout: '/logout',
  note: {
    detail: (id: number) => `/note/${id}`,
    create: '/create/note',
    update: (id: number) => `/update/note/${id}`,
    delete: (id: number) => `/delete/note/${id}`,
  },
  oauth2: {
    google: '/oauth2/authorization/google',
  },
  portfolio: {
    detail: '/portfolios',
  },
};

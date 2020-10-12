const LOGIN = 'user/LOGIN' as const;
const LOGOUT = 'user/LOGOUT' as const;

export const login = (user: typeof initialState.loginInfo) => ({
  type: LOGIN,
  payload: user,
});
export const logout = () => ({ type: LOGOUT });

type UserAction = ReturnType<typeof login> | ReturnType<typeof logout>;

type UserState = {
  loginInfo: {
    id: string;
    name: string;
    pictureUrl: string;
  };
  logged: boolean;
};

const initialState: UserState = {
  loginInfo: {
    id: '',
    name: '',
    pictureUrl: '',
  },
  logged: false,
};

function user(state: UserState = initialState, action: UserAction) {
  switch (action.type) {
    case LOGIN:
      return {
        loginInfo: {
          id: action.payload.id,
          name: action.payload.name,
          pictureUrl: action.payload.pictureUrl,
        },
        logged: true,
      };

    case LOGOUT:
      return {
        loginInfo: {
          id: '',
          name: '',
          pictureUrl: '',
        },
        logged: false,
      };

    default:
      return state;
  }
}

export default user;

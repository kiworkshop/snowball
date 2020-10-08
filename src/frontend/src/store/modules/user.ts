const LOGIN = 'user/LOGIN' as const;
const LOGOUT = 'user/LOGOUT' as const;

export const login = (user: UserState) => ({ type: LOGIN, payload: user });
export const logout = () => ({ type: LOGOUT });

type UserAction = ReturnType<typeof login> | ReturnType<typeof logout>;

type UserState = {
  id: string;
  name: string;
  pictureUrl: string;
};

const initialState: UserState = {
  id: '',
  name: '',
  pictureUrl: '',
};

function user(state: UserState = initialState, action: UserAction) {
  switch (action.type) {
    case LOGIN:
      return {
        id: action.payload.id,
        name: action.payload.name,
        pictureUrl: action.payload.pictureUrl,
      };

    case LOGOUT:
      return {
        id: '',
        name: '',
        pictureUrl: '',
      };

    default:
      return state;
  }
}

export default user;

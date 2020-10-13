import { UserType } from '../../type/user';

/*
    Actions
 */

const LOGIN = 'user/LOGIN' as const;
const LOGOUT = 'user/LOGOUT' as const;

/*
    Action Creators
 */

export const login = (user: UserType.UserInfo) => ({
  type: LOGIN,
  payload: user,
});
export const logout = () => ({ type: LOGOUT });

type UserAction = ReturnType<typeof login> | ReturnType<typeof logout>;

/*
    Initial State
 */

const initialState: UserType.UserState = {
  userInfo: {
    id: '',
    name: '',
    pictureUrl: '',
  },
  logged: false,
};

/*
    Dispatch Function
 */

function user(state: UserType.UserState = initialState, action: UserAction) {
  switch (action.type) {
    case LOGIN:
      return {
        userInfo: { ...action.payload },
        logged: true,
      };

    case LOGOUT:
      return {
        userInfo: {
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

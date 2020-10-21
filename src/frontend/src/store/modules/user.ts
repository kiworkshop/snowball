import { ThunkAction } from 'redux-thunk';
import store from 'store2';
import { UserType } from '../../type/user';
import { RootState } from './index';
import { login as loginAPI } from '../../lib/api/user';

// Actions
const LOGIN = 'user/LOGIN' as const;
const LOGIN_SUCCESS = 'user/LOGIN_SUCCESS' as const;
const LOGIN_FAIL = 'user/LOGIN_FAIL' as const;

const LOGOUT = 'user/LOGOUT' as const;

// Action Type
type UserAction =
  | { type: typeof LOGIN }
  | { type: typeof LOGIN_SUCCESS; payload: UserType.UserInfo }
  | { type: typeof LOGIN_FAIL; payload: string }
  | { type: typeof LOGOUT };

type ThunkResult<R> = ThunkAction<R, RootState, undefined, UserAction>;

// Action creators
export const login = (user?: UserType.UserInfo): ThunkResult<void> => async (
  dispatch
) => {
  try {
    dispatch({ type: LOGIN });

    if (user) {
      dispatch({ type: LOGIN_SUCCESS, payload: user });
    } else {
      const { data: loggedInUser } = await loginAPI();
      store.set('snowball-user', {
        user: loggedInUser,
        expired: Date.now() + 1000 * 60 * 60 * 24,
      });

      dispatch({ type: LOGIN_SUCCESS, payload: loggedInUser });
    }
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const logout = (): ThunkResult<void> => (dispatch) => {
  dispatch({ type: LOGOUT });
  store.remove('snowball-user');
};

// Initial State
const initialState: UserType.UserState = {
  userInfo: {
    id: '',
    email: '',
    name: '',
    age: null,
    gender: '',
    pictureUrl: '',
    notes: [],
  },
  logged: false,
  loading: false,
  error: '',
};

// Reducer
function user(state: UserType.UserState = initialState, action: UserAction) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        loading: true,
        error: '',
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        userInfo: { ...action.payload },
        loading: false,
        error: '',
      };

    case LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case LOGOUT:
      return {
        ...state,
        userInfo: {
          id: '',
          email: '',
          name: '',
          age: null,
          gender: '',
          pictureUrl: '',
          notes: [],
        },
        logged: false,
      };

    default:
      return state;
  }
}

export default user;

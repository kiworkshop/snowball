import { createReducer } from 'typesafe-actions';
import { UserAction, UserState } from './types';
import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_STORED_USER,
  LOGIN_SUCCESS,
  LOGOUT,
} from './actions';

const initialState: UserState = {
  profile: {
    id: null,
    name: '',
    pictureUrl: '',
  },
  isLoggedIn: false,
  loading: {},
  error: {},
};

const user = createReducer<UserState, UserAction>(initialState, {
  [LOGIN_REQUEST]: (state) => ({
    ...state,
    loading: { ...state.loading, login: true },
    error: { ...state.error, login: null },
  }),
  [LOGIN_SUCCESS]: (state, action) => ({
    ...state,
    profile: {
      id: action.payload.id,
      name: action.payload.name,
      pictureUrl: action.payload.pictureUrl,
    },
    isLoggedIn: true,
    loading: { ...state.loading, login: false },
    error: { ...state.error, login: null },
  }),
  [LOGIN_FAILURE]: (state, action) => ({
    ...state,
    loading: { ...state.loading, login: false },
    error: { ...state.error, login: action.payload },
  }),
  [LOGOUT]: (state) => ({
    ...state,
    profile: {
      id: null,
      name: '',
      pictureUrl: '',
    },
    isLoggedIn: false,
  }),
  [LOGIN_STORED_USER]: (state, action) => ({
    ...state,
    profile: {
      id: action.payload.id,
      name: action.payload.name,
      pictureUrl: action.payload.pictureUrl,
    },
    isLoggedIn: true,
  }),
});

export default user;

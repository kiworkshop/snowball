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
    id: '',
    email: '',
    name: '',
    age: null,
    gender: '',
    pictureUrl: '',
  },
  isLoggedIn: false,
  notes: [],
  loading: false,
  error: null,
};

const user = createReducer<UserState, UserAction>(initialState, {
  [LOGIN_REQUEST]: (state) => ({
    ...state,
    loading: true,
    error: null,
  }),
  [LOGIN_SUCCESS]: (state, action) => ({
    ...state,
    profile: {
      id: action.payload.id,
      email: action.payload.email,
      name: action.payload.name,
      age: action.payload.age,
      gender: action.payload.gender,
      pictureUrl: action.payload.pictureUrl,
    },
    notes: action.payload.notes,
    isLoggedIn: true,
    loading: false,
    error: null,
  }),
  [LOGIN_FAILURE]: (state, action) => ({
    ...state,
    loading: false,
    error: action.payload,
  }),
  [LOGOUT]: (state) => ({
    ...state,
    profile: {
      id: '',
      email: '',
      name: '',
      age: null,
      gender: '',
      pictureUrl: '',
    },
    isLoggedIn: false,
  }),
  [LOGIN_STORED_USER]: (state, action) => ({
    ...state,
    profile: {
      id: action.payload.id,
      email: action.payload.email,
      name: action.payload.name,
      age: action.payload.age,
      gender: action.payload.gender,
      pictureUrl: action.payload.pictureUrl,
    },
    notes: action.payload.notes,
    isLoggedIn: true,
  }),
});

export default user;

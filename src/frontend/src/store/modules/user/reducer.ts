import { createReducer } from 'typesafe-actions';
import { UserAction, UserState } from './types';
import {
  GET_NOTES_OF_USER_FAILURE,
  GET_NOTES_OF_USER_REQUEST,
  GET_NOTES_OF_USER_SUCCESS,
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
      email: action.payload.email,
      name: action.payload.name,
      age: action.payload.age,
      gender: action.payload.gender,
      pictureUrl: action.payload.pictureUrl,
    },
    notes: action.payload.notes,
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
  [GET_NOTES_OF_USER_REQUEST]: (state) => ({
    ...state,
    loading: { ...state.loading, getNotesOfUser: true },
    error: { ...state.error, getNotesOfUser: null },
  }),
  [GET_NOTES_OF_USER_SUCCESS]: (state, action) => ({
    ...state,
    notes: [...action.payload],
    loading: { ...state.loading, getNotesOfUser: false },
    error: { ...state.error, getNotesOfUser: null },
  }),
  [GET_NOTES_OF_USER_FAILURE]: (state, action) => ({
    ...state,
    loading: { ...state.loading, getNotesOfUser: false },
    error: { ...state.error, getNotesOfUser: action.payload },
  }),
});

export default user;

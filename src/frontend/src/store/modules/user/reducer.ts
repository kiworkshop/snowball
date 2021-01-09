import { createReducer } from 'typesafe-actions';
import { UserAction, UserState } from './types';
import * as actions from './actions';

const initialState: UserState = {
  profile: {
    id: null,
    name: '',
    pictureUrl: '',
  },
  loading: {},
  error: {},
};

const user = createReducer<UserState, UserAction>(initialState, {
  [actions.LOGIN_REQUEST]: (state) => ({
    ...state,
    loading: { ...state.loading, login: true },
    error: { ...state.error, login: null },
  }),
  [actions.LOGIN_SUCCESS]: (state, action) => ({
    ...state,
    profile: {
      id: action.payload.id,
      name: action.payload.name,
      pictureUrl: action.payload.pictureUrl,
    },
    loading: { ...state.loading, login: false },
    error: { ...state.error, login: null },
  }),
  [actions.LOGIN_FAILURE]: (state, action) => ({
    ...state,
    loading: { ...state.loading, login: false },
    error: { ...state.error, login: action.payload },
  }),
  [actions.LOGOUT]: (state) => ({
    ...state,
    profile: {
      id: null,
      name: '',
      pictureUrl: '',
    },
  }),
  [actions.LOGIN_STORED_USER]: (state, action) => ({
    ...state,
    profile: {
      id: action.payload.id,
      name: action.payload.name,
      pictureUrl: action.payload.pictureUrl,
    },
  }),
});

export default user;

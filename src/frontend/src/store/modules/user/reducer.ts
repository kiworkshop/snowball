import { createReducer } from 'typesafe-actions';
import { UserAction, UserState } from './types';
import * as actions from './actions';

const initialState: UserState = {
  isInit: false,
  profile: {
    id: null,
    name: '',
    pictureUrl: '',
  },
  loading: {},
  error: {},
};

const user = createReducer<UserState, UserAction>(initialState, {
  [actions.GET_ME_REQUEST]: (state) => ({
    ...state,
    isInit: false,
    loading: { ...state.loading, getMe: true },
    error: { ...state.error, getMe: null },
  }),
  [actions.GET_ME_SUCCESS]: (state, action) => ({
    ...state,
    isInit: true,
    profile: {
      id: action.payload.id,
      name: action.payload.name,
      pictureUrl: action.payload.pictureUrl,
    },
    loading: { ...state.loading, getMe: false },
    error: { ...state.error, getMe: null },
  }),
  [actions.GET_ME_FAILURE]: (state, action) => ({
    ...state,
    isInit: false,
    loading: { ...state.loading, getMe: false },
    error: { ...state.error, getMe: action.payload },
  }),
  [actions.LOGOUT]: (state) => ({
    ...state,
    isInit: false,
    profile: {
      id: null,
      name: '',
      pictureUrl: '',
    },
  }),
});

export default user;

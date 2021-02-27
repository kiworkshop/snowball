import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useFailure, useRequest } from '../../hooks/store';
import { Profile, UserState } from './type';

const initialState: UserState = {
  isLoggedIn: false,
  profile: {
    id: null,
    name: '',
    pictureUrl: '',
  },
  loading: {},
  error: {},
};

const request = useRequest<UserState>();
const failure = useFailure<UserState>();

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getMeRequest: request<undefined>('getMe'),
    getMeFailure: failure('getMe'),
    getMeSuccess: (state, action: PayloadAction<Profile>) => {
      state.isLoggedIn = true;
      state.profile = action.payload;
      state.loading.getMe = false;
      state.error.getMe = null;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.profile = {
        id: null,
        name: '',
        pictureUrl: '',
      };
    },
  },
});

export default userSlice;

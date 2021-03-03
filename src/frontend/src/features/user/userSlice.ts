import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Profile, UserState } from './type';
import { AxiosError } from 'axios';

const initialState: UserState = {
  profile: {
    id: null,
    name: '',
    pictureUrl: '',
  },
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getMeRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    getMeFailure: (state, action: PayloadAction<AxiosError>) => {
      state.loading = false;
      state.error = action.payload;
    },
    getMeSuccess: (state, action: PayloadAction<Profile>) => {
      state.profile = action.payload;
      state.loading = false;
      state.error = null;
    },
    logout: (state) => {
      state.profile = {
        id: null,
        name: '',
        pictureUrl: '',
      };
    },
  },
});

export default userSlice;

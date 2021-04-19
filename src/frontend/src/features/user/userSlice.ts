import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as Type from '../../types';
import { AxiosError } from 'axios';

interface UserState {
  isLoggedIn: boolean;
  profile: Type.Profile;
  loading: boolean;
  error: Error | null;
}

const initialState: UserState = {
  isLoggedIn: false,
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
      state.isLoggedIn = false;
      state.loading = true;
      state.error = null;
    },
    getMeSuccess: (state, action: PayloadAction<Type.Profile>) => {
      state.isLoggedIn = true;
      state.profile = action.payload;
      state.loading = false;
    },
    getMeFailure: (state, action: PayloadAction<AxiosError>) => {
      state.isLoggedIn = false;
      state.loading = false;
      state.error = action.payload;
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

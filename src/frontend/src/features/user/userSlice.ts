import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

interface Profile {
  id: number | null;
  name: string;
  pictureUrl: string;
}

export interface UserState {
  profile: Profile;
  loading: boolean;
  error: Error | null;
}

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
    getMeSuccess: (state, action: PayloadAction<Profile>) => {
      state.profile = action.payload;
      state.loading = false;
      state.error = null;
    },
    getMeFailure: (state, action: PayloadAction<AxiosError>) => {
      state.loading = false;
      state.error = action.payload;
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

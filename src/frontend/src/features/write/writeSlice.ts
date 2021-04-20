import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WriteState {
  isWritingSucceeded: boolean;
}

const initialState: WriteState = {
  isWritingSucceeded: false,
};

const writeSlice = createSlice({
  name: 'write',
  initialState,
  reducers: {
    initialize: (state) => {
      state.isWritingSucceeded = false;
    },
    success: (state, action: PayloadAction<number>) => {
      state.isWritingSucceeded = true;
    },
  },
});

export default writeSlice;

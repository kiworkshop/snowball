import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';

interface CommonState {
  loading: {
    [action: string]: boolean;
  };
  error: {
    [action: string]: Error | null;
  };
}

export const useRequest = <State extends CommonState>() => <Payload>(
  name: string
) => (state: State, action: PayloadAction<Payload>) => {
  state.loading[name] = true;
  state.error[name] = null;
};

export const useFailure = <State extends CommonState>() => (name: string) => (
  state: State,
  action: PayloadAction<AxiosError>
) => {
  state.loading[name] = false;
  state.error[name] = action.payload;
};

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

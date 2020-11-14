import { ActionType } from 'typesafe-actions';
import { ThunkAction } from 'redux-thunk';
import * as actions from './actions';
import { User } from '../../../type/user';
import { RootState } from '../index';

export type UserAction = ActionType<typeof actions>;

export type UserState = {
  profile: User.Profile;
  isLoggedIn: User.IsLoggedIn;
  notes: User.Notes;
  loading: {
    [action: string]: boolean;
  };
  error: {
    [action: string]: Error | null;
  };
};

export type UserThunkAction = ThunkAction<void, RootState, null, UserAction>;

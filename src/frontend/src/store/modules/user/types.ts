import * as actions from './actions';
import { ActionType } from 'typesafe-actions';
import { User } from '../../../type/user';

export type UserAction = ActionType<typeof actions>;

export type UserState = {
  profile: User.Profile;
  isLoggedIn: User.IsLoggedIn;
  notes: User.Notes;
  loading: boolean;
  error: Error | null;
};

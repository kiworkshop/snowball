import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

export type UserAction = ActionType<typeof actions>;

export interface UserState {
  isInit: boolean;
  profile: Profile;
  loading: {
    [action: string]: boolean;
  };
  error: {
    [action: string]: Error | null;
  };
}

export interface Profile {
  id: number | null;
  name: string;
  pictureUrl: string;
}

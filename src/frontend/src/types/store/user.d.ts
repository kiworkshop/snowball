import { Profile } from '../domain/user';

export interface UserState {
  profile: Profile;
  loading: boolean;
  error: Error | null;
}

export namespace UserPayload {
  namespace GetMe {
    type Success = Profile;
  }
}

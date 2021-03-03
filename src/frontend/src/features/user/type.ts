export interface UserState {
  isLoggedIn: boolean;
  profile: Profile;
  loading: boolean;
  error: Error | null;
}

export interface Profile {
  id: number | null;
  name: string;
  pictureUrl: string;
}

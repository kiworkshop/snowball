export interface UserState {
  isLoggedIn: boolean;
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

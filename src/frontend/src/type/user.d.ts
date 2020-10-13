export namespace UserType {
  interface UserInfo {
    id: string;
    name: string;
    pictureUrl: string;
  }

  interface UserState {
    userInfo: UserInfo;
    logged: boolean;
  }
}

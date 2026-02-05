export interface ISignin {
  id: number | undefined;
  username: string;
  email: string;
  password: string;
  role: string
}

export interface IAccount {
  id: number | undefined;
  username: string;
  email: string;
  password: string;
  profileId: number | undefined;
  role: string
}



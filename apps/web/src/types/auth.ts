export interface User {
  id: string;
  email: string;
  username: string;
  avatar?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface SignupData extends LoginData {
  username: string;
}
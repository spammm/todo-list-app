import { ErrorType, StatusType } from './tasksTypes';

export type UserIdType = number | string;

export type RefType = string;

export interface UserType {
  id: UserIdType;
  name: string;
  login: string;
  password: string;
  friends: RefType[];
  hash: string;
  referal: RefType;
}

export interface UserStateType {
  profile: UserType;
  status: StatusType;
  error: ErrorType;
}

export type UserKeyType = keyof UserType;

import { FriendType } from './friendsTypes';
import { RefType } from './usersTypes';

export type IdType = number | string;
export type StatusType = 'loading' | 'succeeded' | 'failed' | 'idle';
export type ErrorType = string | null | undefined;

export interface TaskType {
  id: IdType;
  text: string;
  completed: boolean;
  executor: RefType;
  founder: RefType;
}

export interface TasksStateType {
  tasks: TaskType[];
  status: StatusType;
  error: ErrorType;
}

export interface TaskComponentType extends TaskType {
  friendsList: FriendType[];
}

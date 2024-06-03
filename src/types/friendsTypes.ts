import { ErrorType, StatusType } from './tasksTypes';
import { RefType, UserIdType } from './usersTypes';

export interface FriendType {
  id: UserIdType;
  referal: RefType;
  name: string;
  friends: RefType[];
}

export interface FriendsStateType {
  friends: FriendType[];
  status: StatusType;
  error: ErrorType;
}

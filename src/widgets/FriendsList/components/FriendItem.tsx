import React from 'react';
import { getProfile, updateProfile } from '../../Profile/profileReducer';
import { resetFriendsStatus } from '../friendsReducer';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { truncateString } from './../../../utils/stringUtils';
import { FriendType } from '../../../types/friendsTypes';
import { RefType } from '../../../types/usersTypes';

const FriendItem: React.FC<FriendType> = React.memo(
  ({ name, referal, id: friendID, friends: friendFriends }) => {
    const dispatch = useAppDispatch();
    const { friends, id, referal: profileRef } = useAppSelector(getProfile);

    const deleteFriend = (ref: RefType) => {
      const updatedFriends = friends.filter((f) => f !== ref);
      console.log(ref, updatedFriends);
      dispatch(updateProfile({ id, friends: updatedFriends }))
        .then(() => {
          const updatedFriends = friendFriends.filter((f) => f !== profileRef);
          dispatch(updateProfile({ id: friendID, friends: updatedFriends }));
        })
        .then(() => {
          dispatch(resetFriendsStatus());
        });
    };
    return (
      <div title={name}>
        {truncateString(name, 20)}
        <button onClick={() => deleteFriend(referal)}>❌</button>
      </div>
    );
  },
  (prevProps, nextProps) => {
    return prevProps.name === nextProps.name;
  }
);

export default FriendItem;

import { AddFriend } from '../../widgets/AddFriend';
import { FriendsList } from '../../widgets/FriendsList';

const FriendsPage: React.FC = () => {
  return (
    <>
      <h1>Друзья</h1>
      <div>
        <AddFriend />
        <FriendsList />
      </div>
    </>
  );
};

export default FriendsPage;

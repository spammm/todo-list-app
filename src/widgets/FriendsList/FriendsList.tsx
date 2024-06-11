import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getProfile } from '../Profile/profileReducer';
import style from './FriendsList.module.scss';
import { fetchFriends, selectAllFriends } from './friendsReducer';
import { SpinnerText } from '../../shared/Spinners';
import FriendItem from './components/FriendItem';

const FriendsList: React.FC = () => {
  const dispatch = useAppDispatch();
  const friendsList = useAppSelector(selectAllFriends);
  const error = useAppSelector((state) => state.friends.error);
  const postStatus = useAppSelector((state) => state.friends.status);
  const { friends, id, referal } = useAppSelector(getProfile);

  useEffect(() => {
    if (postStatus === 'idle' && id) {
      dispatch(fetchFriends());
    }
  }, [dispatch, postStatus, friends.length, friends, id]);

  if (postStatus === 'failed') return <div>{error}</div>;

  if (postStatus === 'loading' && !friends)
    return <SpinnerText text="Список друзей загружается..." />;

  if (friendsList.length === 0)
    return (
      <div>
        Добавьте друзей и вы сможете назначать им задачи. <br />
        <br />
        Чтобы добавить друга, введите его ID в поле ввода и нажмите кнопку
        "Добавить".
        <br />
        <br />
        Или вы можете отправить ему свой ID(<b>{referal}</b>), чтобы он добавил
        вас.
      </div>
    );

  const renderList = friendsList.map((friend) => {
    return (
      <li key={friend.referal}>
        <FriendItem {...friend} />
      </li>
    );
  });

  return (
    <div className={style.friends_list}>
      <h2>Добавленные друзья:</h2>
      <ul>{renderList}</ul>
    </div>
  );
};

export default FriendsList;

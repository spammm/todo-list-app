import style from './TasksList.module.scss';
import { selectAllTasks, fetchTasks } from './tasksReducer';
import Task from './components/Task/Task';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { SpinnerText as Spinner } from '../../shared/Spinners';
import { getProfile } from '../Profile/profileReducer';
import { fetchFriends, selectAllFriends } from '../FriendsList/friendsReducer';

const TasksList: React.FC = () => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector(selectAllTasks);
  const error = useAppSelector((state) => state.tasks.error);
  const postStatus = useAppSelector((state) => state.tasks.status);
  const { friends, referal } = useAppSelector(getProfile);
  const friendPostStatus = useAppSelector((state) => state.friends.status);
  const friendsList = useAppSelector(selectAllFriends);

  useEffect(() => {
    if (friendPostStatus === 'idle' && friends.length !== 0) {
      if (friends && friends.length !== 0) dispatch(fetchFriends());
    }
  }, [dispatch, friendPostStatus, friends]);

  useEffect(() => {
    if (postStatus === 'idle') {
      if (referal) dispatch(fetchTasks());
    }
  }, [postStatus, dispatch, referal]);

  if (
    (postStatus === 'loading' && !tasks.length) ||
    (friendPostStatus === 'loading' && !friends.length)
  ) {
    return <Spinner text="Загрузка списка задач..." />;
  } else if (postStatus === 'failed') {
    return <div>{error}</div>;
  }

  if (tasks.length === 0)
    return (
      <div>
        Создайте задачи, отмечайте их выполнеными или удаляйте. <br />
        Добавьте друзей и вы сможете делегировать задачи друг другу.
      </div>
    );

  const renderList = tasks.map((task) => (
    <li key={task.id}>
      <Task {...task} friendsList={friendsList} />
    </li>
  ));

  return <ul className={style.list}>{renderList}</ul>;
};

export default TasksList;

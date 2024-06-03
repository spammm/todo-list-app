import { SpinnerText } from '../../../../shared/Spinners';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { FriendType } from '../../../../types/friendsTypes';
import { TaskType } from '../../../../types/tasksTypes';
import { RefType } from '../../../../types/usersTypes';
import { updateTask } from '../../tasksReducer';
import style from './AssignTask.module.scss';

interface AssignTaskType extends TaskType {
  friendsList: FriendType[];
  afterSave?: () => void;
  profileRef: RefType;
}

const AssignTask: React.FC<AssignTaskType> = ({
  id,
  friendsList,
  afterSave,
  profileRef,
  executor,
}) => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.tasks.status) === 'loading';

  const assignTask = (executor: RefType) => {
    dispatch(updateTask({ id, executor: executor })).finally(() => {
      if (afterSave) afterSave();
    });
  };

  const renderFriends = friendsList.map((friend) => (
    <li
      key={friend.id}
      onClick={() => assignTask(friend.referal)}
      className={friend.referal === executor ? style.active : ''}
    >
      {friend.name}
    </li>
  ));

  if (isLoading) return <SpinnerText text="Отправка данных..." />;

  return (
    <div className={style.assign_list}>
      <h2>Выберите Исполнителя</h2>
      <ul>
        {renderFriends}
        <li
          onClick={() => assignTask(profileRef)}
          className={profileRef === executor ? style.active : ''}
        >
          Назначить на себя
        </li>
      </ul>
    </div>
  );
};

export default AssignTask;

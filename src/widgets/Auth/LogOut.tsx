import { useEffect } from 'react';
import { resetFriendsStatus } from '../FriendsList/friendsReducer';
import { resetTasksStatus } from '../TasksList/tasksReducer';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getProfile, logOut } from '../Profile/profileReducer';
import { SpinnerText } from '../../shared/Spinners';

const LogOut: React.FC = () => {
  const { id } = useAppSelector(getProfile);
  const isLoading = useAppSelector((state) => state.user.status) === 'loading';
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (id && !isLoading)
      dispatch(logOut()).then(() => {
        dispatch(resetFriendsStatus());
        dispatch(resetTasksStatus());
      });
  }, [dispatch, id, isLoading]);
  return <SpinnerText text="Очистка данных..." />;
};

export default LogOut;

import { useState } from 'react';
import { resetFriendsStatus } from '../FriendsList/friendsReducer';
import { getProfile, addFriend } from '../Profile/profileReducer';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { ErrorType } from '../../types/tasksTypes';
import { PopupNotification } from '../../shared/PopupNotification';
import style from './AddFriend.module.scss';

const AddFriend: React.FC = () => {
  const error = useAppSelector((state) => state.user.error);
  const [localError, setLocalError] = useState<ErrorType>(null);
  const [dismissedError, setDismissedError] = useState<ErrorType>(null);
  const isLoading = useAppSelector((state) => state.user.status) === 'loading';
  const [inputValue, setInputValue] = useState<string>('');
  const dispatch = useAppDispatch();
  const { friends, referal } = useAppSelector(getProfile);

  const errorText = localError ?? (error !== dismissedError ? error : null);

  const onAdd = async () => {
    if (friends.some((r) => r === inputValue)) {
      return setLocalError('Этот пользователь уже у вас в друзьях...');
    }
    if (referal === inputValue) {
      return setLocalError(
        'Вы пытаетесь добавить самого себя в друзья, не надо так...'
      );
    }

    const result = await dispatch(addFriend(inputValue));
    if (result.meta.requestStatus !== 'rejected') {
      dispatch(resetFriendsStatus());
      setInputValue('');
    }
  };

  return (
    <>
      {errorText && (
        <PopupNotification
          onClose={() => {
            setLocalError(null);
            setDismissedError(error);
          }}
        >
          {errorText}
        </PopupNotification>
      )}
      <label className={style.referal_code}>
        Ваш ID:
        <input
          defaultValue={referal}
          readOnly
          onFocus={(e) => e.target.select()}
        />
      </label>
      <div className={style.add_feriend}>
        <input
          type="text"
          placeholder="Введите ID друга"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value.trim())}
          disabled={isLoading}
        />
        <button onClick={onAdd} disabled={!inputValue || isLoading}>
          Добавить
        </button>
      </div>
    </>
  );
};

export default AddFriend;

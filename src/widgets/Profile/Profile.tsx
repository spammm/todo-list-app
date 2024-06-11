import { useEffect, useState } from 'react';
import { JustButton } from '../../shared/Buttons';
import { InputWithLabel } from '../../shared/Fields';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getProfile, updateProfile } from './profileReducer';
import { UserType } from '../../types/usersTypes';
import { PopupNotification } from '../../shared/PopupNotification';
import { ErrorType } from '../../types/tasksTypes';
import { encryptString } from '../../utils/hash';

const Profile: React.FC = () => {
  const { login, name, id } = useAppSelector(getProfile);
  const error = useAppSelector((state) => state.user.error);
  const status = useAppSelector((state) => state.user.status);
  const isLoading = status === 'loading';
  const [errorText, setErrorText] = useState<ErrorType>(error);
  const [userName, setUserName] = useState(name);
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const dispatch = useAppDispatch();

  const onSaveProfile = async () => {
    const data: Pick<Partial<UserType>, 'password' | 'id' | 'name'> = { id };
    if (name !== userName && userName !== '') {
      data.name = userName;
    }
    if (password) {
      data.password = await encryptString(password);
    }
    dispatch(updateProfile(data));
    setPassword('');
    setRepeatPassword('');
  };

  const isDisabledRepeatPassword = !password;
  const isDisabledSaveChanges = password !== repeatPassword || userName === '';

  useEffect(() => {
    setUserName(name);
  }, [name]);

  return (
    <div className="user_details">
      {errorText && (
        <PopupNotification onClose={() => setErrorText(null)}>
          {errorText}
        </PopupNotification>
      )}
      <form>
        <InputWithLabel type="text" defaultValue={login} disabled>
          Логин:
        </InputWithLabel>
        <InputWithLabel
          type="text"
          placeholder="Введите имя"
          required
          value={userName}
          maxLength={24}
          onChange={(e) => setUserName(e.target.value)}
          title={userName}
          autoComplete="off"
          disabled={isLoading}
        >
          Ваше имя:
        </InputWithLabel>
        <InputWithLabel
          type="password"
          placeholder="Введите новый пароль"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          autoComplete="off"
          disabled={isLoading}
        >
          Пароль:
        </InputWithLabel>

        <InputWithLabel
          type="password"
          placeholder="Повторите ввод пароля"
          disabled={isDisabledRepeatPassword || isLoading}
          onChange={(e) => setRepeatPassword(e.target.value)}
          value={repeatPassword}
          autoComplete="off"
        >
          Повторить пароль:
        </InputWithLabel>
        <hr />
        <JustButton
          type="button"
          disabled={isDisabledSaveChanges || isLoading}
          onClick={onSaveProfile}
        >
          Сохранить изменения
        </JustButton>
      </form>
    </div>
  );
};

export default Profile;

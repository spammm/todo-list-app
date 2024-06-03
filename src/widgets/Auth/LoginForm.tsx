import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authUser, getProfile } from '../Profile/profileReducer';
import { PopupNotification } from '../../shared/PopupNotification';
import { useAppSelector } from '../../store/hooks';
import { useAppDispatch } from './../../store/hooks';
import { JustButton } from '../../shared/Buttons';
import { InputWithLabel } from '../../shared/Fields';
import { SpinnerText } from '../../shared/Spinners';
import { ErrorType } from '../../types/tasksTypes';

const LoginForm: React.FC = () => {
  const error = useAppSelector((state) => state.user.error);
  const status = useAppSelector((state) => state.user.status);
  const [errorText, setErrorText] = useState<ErrorType>(error);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [loginInput, setLoginInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const user = useAppSelector(getProfile);

  const sendIsDisabled = !loginInput || !passwordInput;

  const login = () => {
    if (!sendIsDisabled) {
      dispatch(authUser({ login: loginInput, password: passwordInput }));
    }
  };

  useEffect(() => {
    if (user.id) navigate('/');
  }, [navigate, user]);

  useEffect(() => {
    setErrorText(error);
  }, [error]);

  if (status === 'loading') return <SpinnerText text="Отправка запроса..." />;

  return (
    <>
      {errorText && (
        <PopupNotification onClose={() => setErrorText(null)}>
          {errorText}
        </PopupNotification>
      )}
      <form>
        <InputWithLabel
          type="text"
          placeholder="Введите логин"
          value={loginInput}
          onChange={(e) => setLoginInput(e.target.value)}
          required
          autoComplete='email'
        >
          Логин:
        </InputWithLabel>
        <InputWithLabel
          type="password"
          placeholder="Введите пароль"
          value={passwordInput}
          onChange={(e) => setPasswordInput(e.target.value)}
          required
          autoComplete="current-password"
        ></InputWithLabel>
        <JustButton disabled={sendIsDisabled} onClick={login}>
          Авторизироваться
        </JustButton>
        <br />
        <Link to="/signup">Регистрация</Link>
      </form>
    </>
  );
};

export default LoginForm;

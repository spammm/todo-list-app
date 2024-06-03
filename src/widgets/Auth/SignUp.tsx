import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getProfile, regUser } from '../Profile/profileReducer';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { JustButton } from '../../shared/Buttons';
import { InputWithLabel } from '../../shared/Fields';
import { PopupNotification } from '../../shared/PopupNotification';
import { SpinnerText } from '../../shared/Spinners';
import { ErrorType } from '../../types/tasksTypes';

const SignUp = () => {
  const error = useAppSelector((state) => state.user.error);
  const status = useAppSelector((state) => state.user.status);
  const [errorText, setErrorText] = useState<ErrorType>(error);
  const [loginInput, setLoginInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [repeatPasswordInput, setRepeatPasswordInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(getProfile);

  const sendIsDisabled =
    !loginInput ||
    !passwordInput ||
    !nameInput ||
    repeatPasswordInput !== passwordInput;

  const signUp = () => {
    if (!sendIsDisabled) {
      dispatch(
        regUser({ login: loginInput, password: passwordInput, name: nameInput })
      );
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
          placeholder="Введите свое имя"
          value={nameInput}
          maxLength={24}
          onChange={(e) => setNameInput(e.target.value)}
          required
          autoComplete="name"
        >
          Имя:
        </InputWithLabel>
        <InputWithLabel
          type="text"
          placeholder="Введите логин"
          value={loginInput}
          maxLength={24}
          onChange={(e) => setLoginInput(e.target.value)}
          required
          autoComplete="off"
        >
          Логин:
        </InputWithLabel>
        <InputWithLabel
          type="password"
          placeholder="Введите пароль"
          value={passwordInput}
          onChange={(e) => setPasswordInput(e.target.value)}
          required
          autoComplete="off"
        ></InputWithLabel>
        <InputWithLabel
          type="password"
          placeholder="Повторите ввод пароля пароль"
          value={repeatPasswordInput}
          onChange={(e) => setRepeatPasswordInput(e.target.value)}
          required
          autoComplete="off"
        ></InputWithLabel>
        <JustButton disabled={sendIsDisabled} onClick={signUp}>
          Зарегистрироваться
        </JustButton>
        <br />
        <Link to="/login">Авторизация</Link>
      </form>
    </>
  );
};

export default SignUp;

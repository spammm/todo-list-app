import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import style from './MainMenu.module.scss';
import { useAppSelector } from '../../store/hooks';
import { getProfile } from '../Profile/profileReducer';
import { selectAllTasks } from '../TasksList/tasksReducer';

const MainMenu: React.FC = () => {
  const [toggleViewMenu, setToggleViewMenu] = useState(false);
  const hideMenu = toggleViewMenu ? '' : ` ${style.hidden}`;
  const profile = useAppSelector(getProfile);
  const tasks = useAppSelector(selectAllTasks);
  const taskCounter = tasks.reduce((r, t) => (t.completed ? r : r + 1), 0);
  const renderCounter = taskCounter ? (
    <i className={style.counter}>{taskCounter}</i>
  ) : (
    ''
  );

  return (
    <div
      className={`${style.main_menu}${hideMenu}`}
      onClick={() => setToggleViewMenu((prev) => !prev)}
    >
      <button className={style.menu_button}></button>
      <nav>
        <ul>
          {profile.id ? (
            <>
              <li>
                <NavLink to="/">Список задач {renderCounter}</NavLink>
              </li>
              <li>
                <NavLink to="/friends">Друзья</NavLink>
              </li>
              <li>
                <NavLink to="/settings">Профиль</NavLink>
              </li>
              <li>
                <NavLink to="/logout">Выйти</NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/login">Авторизация</NavLink>
              </li>
              <li>
                <NavLink to="/signup">Регистрация</NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default MainMenu;

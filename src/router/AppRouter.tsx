import { Routes, Route } from 'react-router-dom';
import { RegistrationPage } from '../pages/RegistrationPage';
import { LoginPage } from '../pages/LoginPage';
import { WrapperPage } from '../pages/MainPage';
import { TasksPage } from '../pages/TasksPage';
import { SettingsPage } from '../pages/SettingsPage';
import { FriendsPage } from '../pages/FriendsPage';
import { LogOut } from '../widgets/Auth';

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<WrapperPage />}>
        <Route index element={<TasksPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/friends" element={<FriendsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<RegistrationPage />} />
      </Route>
      <Route path="/logout" element={<LogOut />} />
    </Routes>
  );
};

export default AppRouter;

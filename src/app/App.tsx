import './App.css';
import Auth from '../widgets/Auth/Auth';
import AppRouter from './../router/AppRouter';

const App: React.FC = () => {
  return (
    <Auth>
      <AppRouter />
    </Auth>
  );
};

export default App;

import { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchUserByHash } from '../Profile/profileReducer';

interface AuthProps {
  children: React.ReactNode;
}

const Auth: React.FC<AuthProps> = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const error = useAppSelector((state) => state.user.error);
  const userStatus = useAppSelector((state) => state.user.status);
  const requestSended = useRef(false);

  useEffect(() => {
    const authKey = Cookies.get('authKey');
    if (authKey) {
      if (userStatus === 'idle' && requestSended.current === false) {
        dispatch(fetchUserByHash(authKey));
        requestSended.current = true;
      }
    } else if (
      !location.pathname.startsWith('/login') &&
      !location.pathname.startsWith('/signup')
    ) {
      navigate('/login');
    }
  }, [dispatch, error, location.pathname, navigate, userStatus]);

  useEffect(() => {
    if (error === 'User not found') {
      Cookies.remove('authKey');
    }
  }, [error]);

  return <>{children}</>;
};

export default Auth;

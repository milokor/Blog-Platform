import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../redux/store';
import { UsersSlice } from '../redux/usersSlice/userSlice';
import { baseApi } from '../redux/baseApi';

export const useLogout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return () => {
    dispatch(UsersSlice.actions.logOut());
    dispatch(baseApi.util.resetApiState());
    localStorage.removeItem('authToken');
    navigate('/');
  };
};

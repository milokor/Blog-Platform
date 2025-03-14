import { memo, useEffect } from 'react';
import style from './Header.module.scss';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { setAuthStatus, setUserDate, setUserName } from '../../redux/usersSlice/userSlice';
import { useGetProfileQuery, useGetUserDataQuery } from '../../redux/UsersApi/userApi';
import { ButtonAuthorized } from '../ButtonIsAuthorized/ButtonAuthorized';
import { ButtonNoAuthorized } from '../ButtonIsAuthorized/ButtonNoAuthorized';
import { useLogout } from '../../hooks/useLogOut';
const HeaderComponent = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.users.auth);
  const logout = useLogout();
  const token = localStorage.getItem('authToken');
  const { data: userData, isLoading: isUserLoading } = useGetUserDataQuery(
    token ? JSON.parse(token).token : null,
    {
      skip: !token || !auth,
    },
  );
  const { data: profileData, isLoading: isProfileLoading } = useGetProfileQuery(
    { username: userData?.user.username || '' },
    {
      skip: !userData?.user.username || !auth,
    },
  );
  const isLoading = isUserLoading || isProfileLoading;
  useEffect(() => {
    if (token) {
      const parseToken = JSON.parse(token);
      const isTokenValid = Date.parse(parseToken.expires) > Date.now();
      if (!isTokenValid) {
        logout();
      }
      if (userData && !isLoading) {
        dispatch(setUserName(userData.user.username));
        dispatch(setAuthStatus(true));
      }
      if (profileData) {
        dispatch(setUserDate(profileData.profile));
      }
    }
  }, [token, dispatch, userData, isUserLoading, profileData]);
  return (
    <>
      <header className={style.container}>
        <div className={style.titleContainer}>
          <Link to={'/'} className={style.linkTitle}>
            Realworld Blog
          </Link>
        </div>
        <div className={style.buttonContainer}>
          {auth ? <ButtonAuthorized /> : <ButtonNoAuthorized />}
        </div>
      </header>
    </>
  );
};

export const Header = memo(HeaderComponent);

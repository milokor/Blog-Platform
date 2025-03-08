import { memo, useEffect } from 'react';
import style from './Header.module.scss';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { logOut, setAuthStatus, setUserDate, setUserName } from '../../redux/usersSlice/userSlice';
import { useGetProfileQuery, useGetUserDataQuery } from '../../redux/UsersApi/userApi';
import { Spin } from 'antd';
import { ButtonAuthorized } from '../ButtonIsAuthorized/ButtonAuthorized';
import { ButtonNoAuthorized } from '../ButtonIsAuthorized/ButtonNoAuthorized';
const HeaderComponent = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.users.auth);
  const token = localStorage.getItem('authToken');
  const { data: userData, isLoading: isUserLoading } = useGetUserDataQuery(
    token ? JSON.parse(token).token : null,
    {
      skip: !token,
      refetchOnMountOrArgChange: true,
    },
  );
  const { data: profileData, isLoading: isProfileLoading } = useGetProfileQuery(
    { username: userData?.user.username || '' },
    {
      skip: !userData?.user.username,
    },
  );
  const isLoading = isUserLoading || isProfileLoading;
  useEffect(() => {
    if (token) {
      const parseToken = JSON.parse(token);
      const isTokenValid = Date.parse(parseToken.expires) > Date.now();
      if (!isTokenValid) {
        dispatch(logOut());
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
      {isLoading ? (
        <Spin />
      ) : (
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
      )}
    </>
  );
};

export const Header = memo(HeaderComponent);

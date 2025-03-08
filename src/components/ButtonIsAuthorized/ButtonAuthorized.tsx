import { Link } from 'react-router-dom';
import style from './ButtonIsAuthorized.module.scss';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { logout } from '../../redux/usersSlice/userSlice';
export const ButtonAuthorized = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.users.profile);
  return (
    <>
      <Link to={'/new-article'}>
        <button type="button" className={style.buttonHeaderCreate}>
          Create article
        </button>
      </Link>
      <Link to={'/profile'}>
        <button type="button" className={style.buttonHeaderProfile}>
          {user.username} <img className={style.imageProfile} alt="icon" src={user.image} />
        </button>
      </Link>
      <button type="button" className={style.buttonHeaderLogOut} onClick={() => dispatch(logout())}>
        Log Out
      </button>
    </>
  );
};

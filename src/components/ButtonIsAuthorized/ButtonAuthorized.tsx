import { Link } from 'react-router-dom';
import style from './ButtonIsAuthorized.module.scss';
import { useAppSelector } from '../../redux/store';
import { useLogout } from '../../hooks/useLogOut';
export const ButtonAuthorized = () => {
  const logout = useLogout();
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
      <button type="button" className={style.buttonHeaderLogOut} onClick={() => logout()}>
        Log Out
      </button>
    </>
  );
};

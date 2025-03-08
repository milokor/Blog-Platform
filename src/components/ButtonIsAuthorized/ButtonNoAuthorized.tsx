import { Link } from 'react-router-dom';
import style from './ButtonIsAuthorized.module.scss';
export const ButtonNoAuthorized = () => {
  return (
    <>
      <Link to={'/sign-in'}>
        <button type="button" className={style.buttonHeaderIn}>
          Sign In
        </button>
      </Link>
      <Link to={'/sign-up'}>
        <button type="button" className={style.buttonHeaderUp}>
          Sign Up
        </button>
      </Link>
    </>
  );
};

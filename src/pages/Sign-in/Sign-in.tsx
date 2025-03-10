import { Link, useNavigate } from 'react-router-dom';
import { CustomButton } from '../../components/UI/CustomButton/CustomButton';
import { CustomInput } from '../../components/UI/CustomInput/CustomInput';
import style from './SingIn.module.scss';
import { Controller, useForm } from 'react-hook-form';
import { Iform } from '../../types/type';
import { notification } from 'antd';
import { useLoginUserMutation } from '../../redux/UsersApi/userApi';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../redux/store';
import { setAuthStatus } from '../../redux/usersSlice/userSlice';
export const SignIn = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Iform>({ mode: 'onChange' });
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const [loginUser] = useLoginUserMutation();
  const dispatch = useAppDispatch();
  const onSubmit = async (data1: Iform) => {
    const { email, password } = data1;
    try {
      const { user } = await loginUser({ user: { email, password } }).unwrap();
      localStorage.setItem(
        'authToken',
        JSON.stringify({ token: user.token, expires: new Date(Date.now() + 86400e3) }),
      );
      dispatch(setAuthStatus(true));
      navigate('/');
    } catch (error) {
      if (error) {
        setError(true);
      }
    }
  };
  useEffect(() => {
    if (error) {
      api.error({
        key: 'auth-error',
        message: 'Check the entered email or password',
        onClose: () => setError(false),
      });
    }
    return () => api.destroy('auth-error');
  }, [error, api]);
  return (
    <div className={style.container}>
      {contextHolder}
      <h2 className={style.title}>Sign In</h2>
      <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="email"
          control={control}
          rules={{
            required: 'The field must not be empty',
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: 'Incorrect postal address',
            },
          }}
          render={({ field }) => (
            <CustomInput
              {...field}
              id="email"
              type="email"
              placeholder="Email address"
              error={errors.email?.message}
              label="Email address"
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          rules={{
            required: 'The field must not be empty',
          }}
          render={({ field }) => (
            <CustomInput
              {...field}
              id="password"
              type="password"
              placeholder="Password"
              error={errors.password?.message}
              label="Password"
            />
          )}
        />
        <div className={style.bottomContainer}>
          <CustomButton name="Login" type="submit" />
          <p className={style.descriptionLink}>
            Don’t have an account? <Link to="/sign-up">Sign Up.</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

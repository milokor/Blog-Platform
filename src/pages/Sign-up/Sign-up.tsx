import { Link, useNavigate } from 'react-router-dom';
import { CustomButton } from '../../components/UI/CustomButton/CustomButton';
import { CustomInput } from '../../components/UI/CustomInput/CustomInput';
import { type InputConfig, INPUTFORM } from '../../constants';
import { Checkbox } from 'antd';
import style from './Sign-up.module.scss';
import { Controller, RegisterOptions, useForm } from 'react-hook-form';
import { IformSignIn, keyIformSignIn, ServerError } from '../../types/type';
import { useLoginUserMutation, useRegisterUserMutation } from '../../redux/UsersApi/userApi';
import { useAppDispatch } from '../../redux/store';
import { setAuthStatus } from '../../redux/usersSlice/userSlice';

export const SignUp = () => {
  const {
    handleSubmit,
    formState: { errors },
    control,
    watch,
    setError,
  } = useForm<IformSignIn>({
    mode: 'onChange',
    defaultValues: {
      agreeTerms: false,
    },
  });
  const navigate = useNavigate();
  const [registerUser] = useRegisterUserMutation();
  const [loginUser] = useLoginUserMutation();
  const dispatch = useAppDispatch();
  const getValidationRules = (input: InputConfig<IformSignIn>): RegisterOptions<IformSignIn> => {
    const rules: RegisterOptions<IformSignIn> = { ...input.rules };
    if (input.matchesField) {
      rules.validate = (value: string | boolean) =>
        value === watch(input.matchesField as keyIformSignIn) || "Password doesn't match";
    }
    return rules;
  };
  const onSubmit = async (dataUser: IformSignIn) => {
    const { username, email, password } = dataUser;
    try {
      const { user } = await registerUser({ user: { email, username, password } }).unwrap();
      localStorage.setItem(
        'authToken',
        JSON.stringify({ token: user.token, expires: new Date(Date.now() + 86400e3) }),
      );
      await loginUser({ user: { email, password } }).unwrap();
      dispatch(setAuthStatus(true));
      navigate('/');
    } catch (err) {
      const error = err as ServerError;
      if (error.data?.errors) {
        Object.entries(error.data.errors).forEach(([field, message]) => {
          setError(field as 'username' | 'email', { message });
        });
      }
    }
  };
  return (
    <div className={style.container}>
      <h2 className={style.title}>Create new account</h2>
      <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
        {INPUTFORM.map((input: InputConfig<IformSignIn>) => (
          <Controller<IformSignIn>
            name={input.id}
            control={control}
            rules={getValidationRules(input)}
            key={input.id}
            render={({ field }) => (
              <CustomInput
                {...field}
                key={input.id}
                id={input.id}
                type={input.type}
                label={input.label}
                placeholder={input.placeholder}
                error={errors[input.id]?.message}
                name={input.id}
                value={field.value as string}
              />
            )}
          />
        ))}
        <div className={style.divider}></div>
        <div className={style.agree}>
          <Controller
            name="agreeTerms"
            control={control}
            rules={{
              required: 'You must accept the terms',
            }}
            render={({ field }) => (
              <Checkbox
                {...field}
                checked={field.value}
                onChange={(e) => field.onChange(e.target.checked)}
              >
                I agree to the processing of my personal information
                <br />
                {errors.agreeTerms?.message && (
                  <span className={style.error}>{errors.agreeTerms?.message}</span>
                )}
              </Checkbox>
            )}
          />
        </div>
        <div className={style.bottomContainer}>
          <CustomButton name="Create" type="submit" />
          <p className={style.descriptionLink}>
            Already have an account? <Link to={'/sign-in'}>Sign In.</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

import { CustomInput } from '../../components/UI/CustomInput/CustomInput';
import style from './EditProfile.module.scss';
import { EDITINPUTFORM, InputConfig } from '../../constants';
import { CustomButton } from '../../components/UI/CustomButton/CustomButton';
import { IformEditProfile, ServerError } from '../../types/type';
import { Controller, useForm } from 'react-hook-form';
import { useUpdateProfileMutation } from '../../redux/UsersApi/userApi';
import { useNavigate } from 'react-router-dom';
export const EditProfile = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IformEditProfile>({ mode: 'onChange' });
  const navigate = useNavigate();
  const [updateProfile] = useUpdateProfileMutation();
  const onSubmit = async (data: IformEditProfile) => {
    try {
      await updateProfile({ user: { ...data } }).unwrap();
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
      <h2 className={style.title}>Edit profile</h2>
      <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
        {EDITINPUTFORM.map((input: InputConfig<IformEditProfile>) => (
          <Controller<IformEditProfile>
            name={input.id}
            control={control}
            rules={input.rules}
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
                value={field.value}
              />
            )}
          />
        ))}
        <div className={style.bottomContainer}>
          <CustomButton name={'Save'} type="submit" />
        </div>
      </form>
    </div>
  );
};

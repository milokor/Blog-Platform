import { FieldValues, RegisterOptions } from 'react-hook-form';
import { IformEditProfile, IformSignIn } from './types/type';

export interface InputConfig<T extends FieldValues> {
  id: keyof T;
  type: React.HTMLInputTypeAttribute;
  label: string;
  placeholder: string;
  rules?: RegisterOptions<T>;
  matchesField?: keyof T;
}

export const INPUTFORM: InputConfig<IformSignIn>[] = [
  {
    id: 'username',
    label: 'Username',
    type: 'text',
    placeholder: 'Username',
    rules: {
      required: 'The field must not be empty',
      pattern: {
        value: /^[a-z][a-z0-9]*$/,
        message: 'You can only use lowercase English letters and numbers',
      },
      minLength: {
        value: 3,
        message: 'Password must be 3 characters or more',
      },
      maxLength: {
        value: 20,
        message: 'Password must be no more than 20 characters',
      },
    },
  },
  {
    id: 'email',
    label: 'Email address',
    type: 'email',
    placeholder: 'Email address',
    rules: {
      required: 'The field must not be empty',
      pattern: {
        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        message: 'Incorrect postal address',
      },
    },
  },
  {
    id: 'password',
    label: 'Password',
    type: 'password',
    placeholder: 'Password',
    rules: {
      required: 'The field must not be empty',
      minLength: {
        value: 6,
        message: 'Password must be 6 characters or more',
      },
      maxLength: {
        value: 40,
        message: 'Password must be 40 characters or less',
      },
    },
  },
  {
    id: 'repeatPassword',
    label: 'Repeat Password',
    type: 'password',
    placeholder: 'Password',
    rules: {
      required: 'The field must not be empty',
    },
    matchesField: 'password',
  },
] as const;

export const EDITINPUTFORM: InputConfig<IformEditProfile>[] = [
  {
    id: 'username',
    label: 'Username',
    type: 'text',
    placeholder: 'Username',
    rules: {
      required: 'The field must not be empty',
    },
  },
  {
    id: 'email',
    label: 'Email address',
    type: 'email',
    placeholder: 'Email address',
    rules: {
      required: 'The field must not be empty',
      pattern: {
        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        message: 'Incorrect postal address',
      },
    },
  },
  {
    id: 'password',
    label: 'New password',
    type: 'password',
    placeholder: 'New password',
    rules: {
      required: 'The field must not be empty',
      minLength: {
        value: 6,
        message: 'Password must be 6 characters or more',
      },
      maxLength: {
        value: 40,
        message: 'Password must be 40 characters or less',
      },
    },
  },
  {
    id: 'image',
    label: 'Avatar image (url)',
    type: 'text',
    placeholder: 'Avatar image',
    rules: {
      pattern: {
        value:
          /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=]*)?$/,
        message: 'Incorrect URL',
      },
    },
  },
] as const;

export const baseUrl: string = 'https://blog-platform.kata.academy/api' as const;

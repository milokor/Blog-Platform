import { forwardRef } from 'react';
import style from './CustomInput.module.scss';
import * as React from 'react';

interface CustomInputProps {
  id: string;
  type: React.HTMLInputTypeAttribute;
  label: string;
  placeholder: string;
  error?: string;
  name: string;
  value?: string;
}

export const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
  ({ id, type, placeholder, label, error, value = '', ...props }, ref) => {
    return (
      <label htmlFor={id} className={style.customLabel}>
        <p className={style.customTitle}>{label}</p>
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          className={style.customInput}
          ref={ref}
          value={value}
          {...props}
        />
        {error && <span className={style.error}>{error}</span>}
      </label>
    );
  },
);

import { FC } from 'react';
import style from './CustomButton.module.scss';
interface CustomButtonProps {
  name: string;
  type: 'submit' | 'reset' | 'button' | undefined;
  disabled?: boolean;
  onClick?: () => void;
}

export const CustomButton: FC<CustomButtonProps> = ({ name, type, disabled }) => {
  return (
    <button type={type} className={style.CustomButtonCreate} disabled={disabled}>
      {name}
    </button>
  );
};

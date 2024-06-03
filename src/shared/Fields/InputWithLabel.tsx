import React from 'react';
import style from './InputWithLabel.module.scss';

interface InputWithLabelProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  children?: React.ReactNode;
}

const InputWithLabel: React.FC<InputWithLabelProps> = ({
  children,
  ...props
}) => {
  return (
    <label className={style.field}>
      {children} <input {...props} />
    </label>
  );
};

export default InputWithLabel;

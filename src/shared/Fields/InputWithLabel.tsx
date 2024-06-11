import { useState } from 'react';
import style from './InputWithLabel.module.scss';

interface InputWithLabelProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  children?: React.ReactNode;
  required?: boolean;
}

const InputWithLabel: React.FC<InputWithLabelProps> = ({
  children,
  required = false,
  ...props
}) => {
  const [isRequired, setIdRequired] = useState(false);

  const inputChanged = () => {
    if (required) setIdRequired(true);
  };

  return (
    <label className={style.field}>
      {children}
      <input {...props} required={isRequired} onKeyUp={inputChanged} />
    </label>
  );
};

export default InputWithLabel;

import React, { useId, useState } from 'react';
import style from './style.module.scss';

interface CheckBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  checked?: boolean;
  toggle?: (isChecked: boolean) => void;
}

const CheckBox: React.FC<CheckBoxProps> = ({
  id,
  toggle,
  checked = false,
  ...props
}) => {
  const inputId = useId();
  id = id || inputId;

  const [isChecked, setIsChecked] = useState(checked);
  const toggleChecked: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const isChecked = e.target.checked;
    setIsChecked(isChecked);
    if (toggle) {
      toggle(isChecked);
    }
  };

  return (
    <div className={style.checkbox}>
      <input
        type="checkbox"
        id={id}
        checked={isChecked}
        onChange={toggleChecked}
        {...props}
      />
      <label htmlFor={inputId}></label>
    </div>
  );
};

export default CheckBox;

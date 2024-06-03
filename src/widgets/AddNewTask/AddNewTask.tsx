import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { createNewTask } from '../TasksList/tasksReducer';
import { getProfile } from '../Profile/profileReducer';
import { useAppDispatch } from '../../store/hooks';
import { InputWithLabel } from '../../shared/Fields';
import { JustButton } from '../../shared/Buttons';

const AddNewTask = () => {
  const dispatch = useAppDispatch();
  const [inpueValue, setInputValue] = useState('');
  const { id, referal } = useSelector(getProfile);

  const inputKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
      addNewTask();
    }
  };

  const addButtonDisabled = !inpueValue;

  const addNewTask = () => {
    if (inpueValue !== '' && id) {
      dispatch(
        createNewTask({
          text: inpueValue,
          completed: false,
          founder: referal,
          executor: referal,
        })
      );
      setInputValue('');
    }
  };

  return (
    <>
      <InputWithLabel
        type="text"
        placeholder="Введите текст новой задачи"
        onChange={(e) => setInputValue(e.target.value)}
        value={inpueValue}
        onKeyDown={inputKeyDown}
      >
        Добавить задачу:
      </InputWithLabel>
      <JustButton onClick={addNewTask} disabled={addButtonDisabled}>
        Добавить
      </JustButton>
    </>
  );
};

export default AddNewTask;

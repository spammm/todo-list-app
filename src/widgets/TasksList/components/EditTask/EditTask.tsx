import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { JustButton } from '../../../../shared/Buttons';
import { TaskType } from '../../../../types/tasksTypes';
import style from './EditTask.module.scss';
import { updateTask } from '../../tasksReducer';
import { SpinnerText } from '../../../../shared/Spinners';

interface EditTaskType extends TaskType {
  afterSave?: () => void;
}

const EditTask: React.FC<EditTaskType> = ({ id, text, afterSave }) => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.tasks.status) === 'loading';
  const [value, setValue] = useState(text);

  const isSaveButton = !value;
  const saveTask = () => {
    dispatch(updateTask({ id, text: value })).finally(() => {
      if (afterSave) {
        afterSave();
      }
    });
  };

  if (isLoading) return <SpinnerText text="Отправка данных..." />;

  return (
    <div className="">
      <div className={style.text_input}>
        <textarea
          onChange={(e) => {
            setValue(e.target.value);
          }}
          value={value}
        />
      </div>
      <JustButton disabled={isSaveButton} onClick={saveTask}>
        Сохранить
      </JustButton>
    </div>
  );
};

export default EditTask;

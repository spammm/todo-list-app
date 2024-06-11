import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { IdType, TaskComponentType } from '../../../../types/tasksTypes';
import { truncateString } from './../../../../utils/stringUtils';
import { ModalWindow } from '../../../../shared/ModalWindow';
import { getProfile } from '../../../Profile/profileReducer';
import { deleteTask, updateTask } from '../../tasksReducer';
import { CheckBox } from '../../../../shared/CheckBox';
import { AssignTask } from '../../';
import { EditTask } from '../../';
import style from './Task.module.scss';

const Task: React.FC<TaskComponentType> = React.memo(
  (props) => {
    const { id, completed, text, founder, executor, friendsList } = props;
    const [isEdit, setIsEdit] = useState(false);
    const [isAssign, setIsAssign] = useState(false);
    const dispatch = useAppDispatch();
    const { referal: profileRef } = useAppSelector(getProfile);

    const toggleTaskDone = (id: IdType) => {
      dispatch(updateTask({ id, completed: !completed }));
    };

    const toggleEditModal = () => setIsEdit((prev) => !prev);
    const toggleAssignModal = () => setIsAssign((prev) => !prev);

    const taskDelete = (
      e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
      id: IdType
    ) => {
      e.preventDefault();
      dispatch(deleteTask(id));
    };

    const taskEdit: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
      e.preventDefault();
      setIsEdit(true);
    };

    const assignTask: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
      e.preventDefault();
      setIsAssign(true);
    };

    const founderName =
      founder === profileRef
        ? 'Вы'
        : friendsList.find((friend) => friend.referal === founder)?.name ||
          founder;
    const executorName =
      !executor || executor === profileRef
        ? 'Вы'
        : friendsList.find((friend) => friend.referal === executor)?.name ||
          executor;

    return (
      <>
        <div className={`${style.task} ${completed ? style.done : ''}`}>
          <CheckBox checked={completed} toggle={() => toggleTaskDone(id)} />{' '}
          {text}
        </div>

        <div className={style.footer}>
          {founder !== profileRef ? null : (
            <div className={style.control}>
              <a href="#" onClick={taskEdit}>
                Изменить
              </a>
              <a href="#" onClick={(e) => taskDelete(e, id)}>
                Удалить
              </a>
            </div>
          )}

          <div className={style.founder}>
            <div>
              <span title={founderName}>Назначил: </span>
              {truncateString(founderName, 6)}
            </div>
            <div>
              <span title={executorName}>Исполнитель:</span>
              <a href="#" onClick={assignTask} title={executorName}>
                {truncateString(executorName, 7)}
              </a>
            </div>
          </div>
        </div>
        {isEdit && (
          <ModalWindow onClose={toggleEditModal}>
            <EditTask {...props} afterSave={toggleEditModal} />
          </ModalWindow>
        )}

        {isAssign && (
          <ModalWindow onClose={toggleAssignModal}>
            <AssignTask
              {...props}
              afterSave={toggleAssignModal}
              profileRef={profileRef}
            />
          </ModalWindow>
        )}
      </>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.completed === nextProps.completed &&
      prevProps.text === nextProps.text &&
      prevProps.founder === nextProps.founder &&
      prevProps.executor === nextProps.executor
    );
  }
);

export default Task;

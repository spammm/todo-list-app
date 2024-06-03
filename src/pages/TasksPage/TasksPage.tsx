import { TasksList } from '../../widgets/TasksList';
import { AddNewTask } from '../../widgets/AddNewTask';

const TasksPage: React.FC = () => {
  return (
    <>
      <h1>Список задач</h1>
      <AddNewTask />
      <hr />
      <TasksList />
    </>
  );
};

export default TasksPage;

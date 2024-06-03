import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { IdType, TaskType, TasksStateType } from '../../types/tasksTypes';
import client from '../../api/client';
import { RootStateType } from '../../main';

export const fetchTasks = createAsyncThunk<TaskType[], void>(
  'tasks/fetchTasks',
  async (_, { rejectWithValue, getState }) => {
    const state = getState() as RootStateType;
    const founder = state.user.profile.referal;
    const mytasksReq = async () => {
      const response = await client.get(`tasks?founder=${founder}`);
      return response.data;
    };

    const assignedReq = async () => {
      const response: AxiosResponse<TaskType[]> = await client.get(
        `tasks?founder_ne=${founder}&executor=${founder}`
      );
      //crutch for json-server
      const data = response.data.filter(
        (task) => task.executor === founder && task.founder !== founder
      );
      return data;
    };

    try {
      const allTasks = await Promise.all([mytasksReq(), assignedReq()]);
      return allTasks.flat(Infinity);
    } catch (error) {
      return rejectWithValue('Ошибка получения данных...');
    }
  }
);

export const createNewTask = createAsyncThunk<TaskType, Partial<TaskType>>(
  'tasks/createNewTask',
  async (initialTask) => {
    const response: AxiosResponse<TaskType> = await client.post(
      'tasks',
      initialTask
    );
    return response.data;
  }
);

export const deleteTask = createAsyncThunk<TaskType, IdType>(
  'tasks/deleteTask',
  async (id) => {
    const response: AxiosResponse<TaskType> = await client.delete(
      `tasks/${id}`
    );
    return response.data;
  }
);

export const updateTask = createAsyncThunk<TaskType, Partial<TaskType>>(
  'tasks/updateTask',
  async ({ id, ...initialTask }) => {
    const response: AxiosResponse<TaskType> = await client.patch(
      `tasks/${id}`,
      initialTask
    );
    return response.data;
  }
);

const initialState: TasksStateType = {
  tasks: [],
  status: 'idle',
  error: null,
};
const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    resetTasksStatus(state: TasksStateType) {
      state.status = 'idle';
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = null;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.error =
          typeof action.payload === 'string'
            ? action.payload
            : action.error.message;
      })
      .addCase(createNewTask.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tasks.push(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const updatedTask = action.payload;
        const index = state.tasks.findIndex((task) => {
          return task.id == updatedTask.id;
        });

        if (index !== -1) {
          state.tasks[index] = updatedTask;
          console.log('task updated');
        }
      })
      .addCase(updateTask.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.status = 'failed';
        state.error =
          typeof action.payload === 'string'
            ? action.payload
            : action.error.message;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tasks = state.tasks.filter(
          (task) => task.id !== action.payload.id
        );
      });
  },
});

export { tasksSlice };
export const { resetTasksStatus } = tasksSlice.actions;
export default tasksSlice.reducer;

export const selectAllTasks = (state: RootStateType) => state.tasks.tasks;
export const getTaskById = (state: RootStateType, taskId: IdType) =>
  state.tasks.tasks.find((task) => task.id === taskId);

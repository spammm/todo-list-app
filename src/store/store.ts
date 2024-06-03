import { combineReducers, configureStore } from '@reduxjs/toolkit';
import tasksReducer from '../widgets/TasksList/tasksReducer';
import profileReducer from '../widgets/Profile/profileReducer';
import friendsReducer from '../widgets/FriendsList/friendsReducer';

const rootReducer = combineReducers({
  tasks: tasksReducer,
  user: profileReducer,
  friends: friendsReducer,
});

const createReduxStore = (initialState = {}) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
  });
};

export default createReduxStore;

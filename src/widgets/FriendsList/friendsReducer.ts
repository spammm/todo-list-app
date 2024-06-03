import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { FriendType, FriendsStateType } from '../../types/friendsTypes';
import client from '../../api/client';
import { RootStateType } from '../../main';

const initialState: FriendsStateType = {
  friends: [],
  status: 'idle',
  error: null,
};

export const fetchFriends = createAsyncThunk<FriendType[], void>(
  'friends/fetchFriends',
  async (_, { rejectWithValue, getState }) => {
    const state = getState() as RootStateType;
    const friends = state.user.profile.friends;
    try {
      const fetchTasksPromises = friends.map((ref) =>
        client.get(`users?referal=${ref}`)
      );
      const responses = await Promise.all(fetchTasksPromises);
      const data = responses.map((response) => response.data);

      return data.flat(Infinity);
    } catch (error) {
      return rejectWithValue('Ошибка получения данных...');
    }
  }
);

const friendsSlice = createSlice({
  name: 'friends',
  initialState,
  reducers: {
    resetFriendsStatus(state: FriendsStateType) {
      state.status = 'idle';
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchFriends.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchFriends.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = null;
        state.friends = action.payload;
      })
      .addCase(fetchFriends.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export default friendsSlice.reducer;
export const { resetFriendsStatus } = friendsSlice.actions;

export const selectAllFriends = (state: RootStateType) => state.friends.friends;

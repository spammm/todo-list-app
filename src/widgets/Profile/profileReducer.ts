import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
import { RefType, UserStateType, UserType } from '../../types/usersTypes';
import client from '../../api/client';
import { RootStateType } from '../../main';
import { encryptString } from '../../utils/hash';

const initialState: UserStateType = {
  profile: {
    id: '',
    name: '',
    login: '',
    password: '',
    friends: [],
    referal: '',
    hash: '',
  },
  status: 'idle',
  error: null,
};

export const fetchUserByHash = createAsyncThunk<UserType, string>(
  'user/fetchUser',
  async (hash, { rejectWithValue }) => {
    if (!hash) {
      return rejectWithValue('User not found');
    }
    const response: AxiosResponse<UserType[]> = await client.get(
      `users?hash=${hash}`
    );
    if (response.status >= 400) {
      return rejectWithValue('Ошибка получения данных...');
    }
    if (response.data.length === 0) {
      return rejectWithValue('User not found');
    }
    return response.data[0];
  }
);

export const authUser = createAsyncThunk<
  UserType,
  Pick<UserType, 'login' | 'password'>
>('user/authUser', async ({ login, password }, { rejectWithValue }) => {
  const response: AxiosResponse<UserType[]> = await client.get(
    `users?login=${login}`
  );

  if (response.status >= 400) {
    return rejectWithValue('Ошибка получения данных...');
  }

  if (response.data.length === 0) {
    return rejectWithValue('User not found');
  }
  const user = response.data[0];
  const hashPasswors = await encryptString(password);
  const userPassword = user.password;
  if (hashPasswors !== userPassword) {
    return rejectWithValue('Неверный пароль');
  }

  if (user.hash === '') {
    const hash = await encryptString(nanoid());
    const updateResponse = await client.patch(`users/${user.id}`, { hash });
    if (updateResponse.status >= 400) {
      return rejectWithValue('Ошибка сохранения данных...');
    }
    return updateResponse.data;
  }

  return user;
});

export const regUser = createAsyncThunk<
  UserType,
  Pick<UserType, 'login' | 'password' | 'name'>
>('user/regUser', async ({ login, password, name }, { rejectWithValue }) => {
  const isUserResponse: AxiosResponse<UserType[]> = await client.get(
    `users?login=${login}`
  );
  if (isUserResponse.data.length > 0) {
    return rejectWithValue('Пользователь с таким логином уже существует');
  }
  const hashPassword = await encryptString(password);
  const hash = await encryptString(nanoid());
  const data: Omit<UserType, 'id'> = {
    name,
    login,
    password: hashPassword,
    hash,
    friends: [],
    referal: nanoid(4),
  };

  const response = await client.post(`users`, data);
  if (response.status >= 400) {
    return rejectWithValue('Ошибка получения данных...');
  }
  return response.data;
});

export const logOut = createAsyncThunk<UserType, void>(
  'user/logOut',
  async (_, { rejectWithValue, getState }) => {
    const state = getState() as RootStateType;
    const id = state.user.profile.id;
    const response: AxiosResponse<UserType> = await client.patch(
      `users/${id}`,
      {
        hash: '',
      }
    );
    if (response.status >= 400) {
      rejectWithValue('Ошибка получения данных...');
    }
    return response.data;
  }
);

export const updateProfile = createAsyncThunk<UserType, Partial<UserType>>(
  'user/updateProfile',
  async ({ id, ...initialPost }, { rejectWithValue }) => {
    const response: AxiosResponse<UserType> = await client.patch(
      `users/${id}`,
      initialPost
    );
    if (response.status >= 400) {
      rejectWithValue('Ошибка получения данных...');
    }
    return response.data;
  }
);

export const addFriend = createAsyncThunk<RefType[], RefType>(
  'user/addFriend',
  async (ref, { rejectWithValue, getState }) => {
    const state = getState() as RootStateType;
    const { friends, id } = state.user.profile;
    const checkUserResponse: AxiosResponse<UserType[]> = await client.get(
      `users?referal=${ref}`
    );
    if (checkUserResponse.data.length === 0) {
      if (checkUserResponse.data[0].referal !== ref)
        return rejectWithValue('Такого пользователя не существует');
    }
    const updateResponse: AxiosResponse<UserType> = await client.patch(
      `users/${id}`,
      { friends: [...friends, ref] }
    );
    if (updateResponse.status >= 400) {
      return rejectWithValue('Ошибка при обновлении профиля пользователя');
    }
    //Friend update
    const { id: frId } = checkUserResponse.data[0];
    const { referal } = updateResponse.data;
    const updateFriendProfile: AxiosResponse<UserType> = await client.patch(
      `users/${frId}`,
      { friends: [...friends, referal] }
    );
    if (updateFriendProfile.status >= 400) {
      return rejectWithValue('Ошибка при обновлении профиля друга');
    }

    return updateResponse.data.friends;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUserByHash.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchUserByHash.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = null;
        state.profile = action.payload;
      })
      .addCase(fetchUserByHash.rejected, (state, action) => {
        state.status = 'failed';
        state.error =
          typeof action.payload === 'string'
            ? action.payload
            : action.error.message;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if (state.profile.id == action.payload.id) {
          state.profile = action.payload;
        }
        state.error = null;
      })
      .addCase(updateProfile.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error =
          typeof action.payload === 'string'
            ? action.payload
            : action.error.message;
      })
      .addCase(addFriend.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(addFriend.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = null;
        state.profile.friends = action.payload;
      })
      .addCase(addFriend.rejected, (state, action) => {
        state.status = 'failed';
        state.error =
          typeof action.payload === 'string'
            ? action.payload
            : action.error.message;
      })
      .addCase(authUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        Cookies.set('authKey', action.payload.hash);
        state.profile = action.payload;
        state.error = null;
      })
      .addCase(regUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        Cookies.set('authKey', action.payload.hash);
        state.profile = action.payload;
        state.error = null;
      })
      .addCase(authUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error =
          typeof action.payload === 'string'
            ? action.payload
            : action.error.message;
      })
      .addCase(regUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error =
          typeof action.payload === 'string'
            ? action.payload
            : action.error.message;
      })
      .addCase(authUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(regUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(logOut.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(logOut.rejected, (state, action) => {
        state.status = 'failed';
        state.error =
          typeof action.payload === 'string'
            ? action.payload
            : action.error.message;
      })
      .addCase(logOut.fulfilled, (state) => {
        Cookies.remove('authKey');
        state.status = 'succeeded';
        state.profile = initialState.profile;
        state.error = null;
      });
  },
});

export { userSlice };

export default userSlice.reducer;

export const getProfile = (state: RootStateType) => state.user.profile;

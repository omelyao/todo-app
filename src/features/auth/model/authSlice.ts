import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  login,
  register,
  getProfile,
  changePassword,
  refreshTokenApi
} from './authApi';
import { initialState } from './authconctants';
import { setAuthHeader } from '../../../shared/lib/helpers/setAuthHeader';

// Инициализация заголовка при загрузке
if (initialState.token) {
  setAuthHeader(initialState.token);
}

// Асинхронные thunk-ы, использующие API функции
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({
    email,
    password,
    age
  }: {
    email: string;
    password: string;
    age?: number;
  }) => {
    const data = await register(email, password, age);
    const { accessToken, refreshToken } = data;
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    setAuthHeader(accessToken);
    return { user: data, token: accessToken };
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }: { email: string; password: string }) => {
    const data = await login(email, password);
    const { accessToken, refreshToken } = data;
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    setAuthHeader(accessToken);
    return { user: data, token: accessToken };
  }
);

export const fetchUserProfile = createAsyncThunk(
  'auth/fetchUserProfile',
  async _ => {
    const userData = await getProfile();
    return userData;
  }
);

export const changePasswordThunk = createAsyncThunk(
  'auth/changePassword',
  async ({
    oldPassword,
    newPassword
  }: {
    oldPassword: string;
    newPassword: string;
  }) => {
    await changePassword(oldPassword, newPassword);
    return;
  }
);

export const refreshTokenThunk = createAsyncThunk(
  'auth/refreshToken',
  async _ => {
    const data = await refreshTokenApi();
    const { accessToken, refreshToken } = data;
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    setAuthHeader(accessToken);
    const userData = await getProfile();
    return { user: userData, token: accessToken };
  }
);

// Создаем слайс
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logoutUser: state => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      setAuthHeader(null);
    }
  },
  extraReducers: builder => {
    // Регистрация
    builder
      .addCase(registerUser.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'idle';
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = (action.error.message as string) || 'Registration failed';
      })

      // Вход
      .addCase(loginUser.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'idle';
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = (action.error.message as string) || 'Login failed';
      })

      // Получение профиля
      .addCase(fetchUserProfile.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.status = 'idle';
        state.user = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error =
          (action.error.message as string) || 'Failed to fetch profile';
      })

      // Смена пароля
      .addCase(changePasswordThunk.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(changePasswordThunk.fulfilled, state => {
        state.status = 'idle';
      })
      .addCase(changePasswordThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error =
          (action.error.message as string) || 'Failed to change password';
      })

      // Обновление токена
      .addCase(refreshTokenThunk.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(refreshTokenThunk.fulfilled, (state, action) => {
        state.status = 'idle';
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(refreshTokenThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error =
          (action.error.message as string) || 'Failed to refresh token';
      });
  }
});

export const { logoutUser } = authSlice.actions;
export default authSlice.reducer;

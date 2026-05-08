import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  login,
  register,
  getProfile,
  changePassword,
  refreshTokenApi
} from './authApi';
import axios from 'axios';
// Типы
interface User {
  id: number;
  email: string;
  age?: number;
  createdAt?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  status: 'idle' | 'loading' | 'failed';
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('accessToken'),
  status: 'idle',
  error: null
};

// Вспомогательная функция для установки токена
const setAuthHeader = (token: string | null) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

// Инициализация заголовка при загрузке
if (initialState.token) {
  setAuthHeader(initialState.token);
}

// Асинхронные thunk-ы, использующие API функции
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (
    { email, password, age }: { email: string; password: string; age?: number },
    thunkAPI
  ) => {
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
  async (
    { email, password }: { email: string; password: string },
    thunkAPI
  ) => {
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
  async (_, thunkAPI) => {
    const userData = await getProfile();
    return userData;
  }
);

export const changePasswordThunk = createAsyncThunk(
  'auth/changePassword',
  async (
    { oldPassword, newPassword }: { oldPassword: string; newPassword: string },
    thunkAPI
  ) => {
    await changePassword(oldPassword, newPassword);
    return;
  }
);

export const refreshTokenThunk = createAsyncThunk(
  'auth/refreshToken',
  async (_, thunkAPI) => {
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

import axios from 'axios';

const API_URL = 'http://localhost:3001';

// Вход в систему
export const login = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/auth/login`, {
    email,
    password
  });
  return response.data; // возвращает { accessToken, refreshToken, ...данные пользователя }
};

// Регистрация нового пользователя
export const register = async (
  email: string,
  password: string,
  age?: number
) => {
  const response = await axios.post(`${API_URL}/auth/register`, {
    email,
    password,
    age
  });
  return response.data; // возвращает { accessToken, refreshToken, ...данные пользователя }
};

// Получение данных профиля текущего пользователя
export const getProfile = async () => {
  const response = await axios.get(`${API_URL}/auth/me`);
  return response.data; // возвращает объект пользователя
};

// Смена пароля
export const changePassword = async (
  oldPassword: string,
  newPassword: string
) => {
  await axios.post(`${API_URL}/auth/change-password`, {
    oldPassword,
    newPassword
  });
  return; // Возвращает ничего
};

// Обновление токена
export const refreshTokenApi = async () => {
  const response = await axios.post(`${API_URL}/auth/refresh`, {
    refreshToken: localStorage.getItem('refreshToken')
  });
  return response.data; // возвращает { accessToken, refreshToken, user }
};

import { State } from '../../../store';

export const selectAuthUser = (state: State) => state.auth.user;
export const selectAuthStatus = (state: State) => state.auth.status;
export const selectAuthError = (state: State) => state.auth.error;
export const selectSuccessMsg = (state: State) =>
  state.auth.user ? 'Успешно зарегистрировано!' : null;
// Новая селектор для токена
export const selectAuthToken = (state: State) => state.auth.token;
// Селектор для проверки авторизации
export const selectIsAuthenticated = (state: State) =>
  Boolean(selectAuthToken(state));

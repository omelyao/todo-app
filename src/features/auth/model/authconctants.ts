import { AuthState } from '../../todo/model/types';
export const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('accessToken'),
  status: 'idle',
  error: null
};

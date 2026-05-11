import { TodoState } from './types';
export const lightTheme = {
  body: '#ffffff',
  color: '#000000'
};

export const darkTheme = {
  body: '#121212',
  color: '#ffffff'
};
export const initialState: TodoState = {
  list: [],
  status: 'idle',
  error: null,
  total: 0,
  totalPages: 0,
  currentPage: 1,
  limit: 10,
  filter: {
    status: 'all',
    sortDate: 'newest'
  }
};

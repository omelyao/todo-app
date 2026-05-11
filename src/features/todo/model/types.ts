export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  createdAt: number;
}
export type SortOrder = 'newest' | 'oldest';
export interface Filter {
  status?: 'all' | 'completed' | 'notCompleted';
  sortDate: SortOrder;
}
export interface Option {
  value: string | number;
  name: string;
}
declare module 'styled-components' {
  export interface DefaultTheme {
    body: string;
    color: string;
  }
}
export interface PaginationProps {
  totalPages: number;
  page: number;
  changePage: (page: number) => void;
}
export interface TodoState {
  list: Todo[]; // полный список задач
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  total: number;
  totalPages: number;
  currentPage: number;
  limit: number;
  filter: Filter;
}
export interface User {
  id: number;
  email: string;
  age?: number;
  createdAt?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  status: 'idle' | 'loading' | 'failed';
  error: string | null;
}

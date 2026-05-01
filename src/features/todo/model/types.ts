// Интерфейс для задачи (todo)
export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  createdAt: number;
}
export interface Filter {
  status?: 'all' | 'completed' | 'notCompleted';
  sortDate: 'newest' | 'oldest';
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

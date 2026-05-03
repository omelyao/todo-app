import styled from 'styled-components';
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

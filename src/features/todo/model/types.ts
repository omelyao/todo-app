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

export interface TodoListProps {
  tasks: Todo[];
  updateTask: (id: number, newText: string) => void;
  deleteTask: (id: number) => void;
  toggleComplete: (id: number, text: string, completed: boolean) => void;
}

export interface TodoItemProps {
  task: Todo;
  updateTask: (id: number, newText: string) => void;
  deleteTask: (id: number) => void;
  toggleComplete: (id: number) => void; // изменить сигнатуру
  number: number;
}
export interface SortAndFilterTodoProps {
  filter: Filter;
  setFilter: (newFilter: Filter) => void; // явно типизируйте
}
export interface EditTodoProps {
  initialText: string;
  onSave: (text: string) => void;
  onCancel: () => void;
}
export interface AddTodoProps {
  create: (task: { text: string }) => void;
}

export interface MyInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}
export interface MyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}
export interface Option {
  value: string | number;
  name: string;
}
export interface MySelectProps {
  options: Option[];
  defaultValue: string;
  value: string | number;
  onChange: (value: string | number) => void;
}
export interface MyTextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}
export interface HeaderProps {
  toggleTheme: () => void;
  themeType: 'light' | 'dark';
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

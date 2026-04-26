import { Todo } from '../features/todo/model/types';

const URL = 'http://localhost:3001/tasks';
const headers = {
  'Content-Type': 'application/json',
};

export const todoApi = {
  getAll: (): Promise<Todo[]> => {
    return fetch(URL).then(response => response.json());
  },
  add: (task: Omit<Todo, 'id' | 'createdAt'>): Promise<Todo> => {
    return fetch(URL, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(task),
    }).then(response => response.json());
  },
  delete: (id: number): Promise<void> => {
    return fetch(`${URL}/${id}`, {
      method: 'DELETE',
    }).then(() => {});
  },
  toggle: (id: number): Promise<Todo> => {
    // Получение текущей задачи
    return fetch(`${URL}/${id}`)
      .then(res => res.json())
      .then(task => {
        // Меняем статус
        const updatedTask = { ...task, completed: !task.completed };
        // Отправляем обновление
        return fetch(`${URL}/${id}`, {
          method: 'PATCH',
          headers: headers,
          body: JSON.stringify(updatedTask),
        }).then(res => res.json());
      });
  },
  update: (
    id: number,
    data: { text?: string; completed?: boolean }
  ): Promise<Todo> => {
    return fetch(`${URL}/${id}`)
      .then(res => res.json())
      .then(task => {
        const updatedTask = {
          ...task,
          ...data,
        };
        return fetch(`${URL}/${id}`, {
          method: 'PUT',
          headers: headers,
          body: JSON.stringify(updatedTask),
        }).then(res => res.json());
      });
  },
};

import { Todo } from '../features/todo/model/types';

const URL = 'http://localhost:3001/tasks';
const headers = {
  'Content-Type': 'application/json'
};

export const todoApi = {
  // Возвращает весь ответ, чтобы получить totalPages
  getAll: async ({ page, limit }: { page: number; limit: number }) => {
    const response = await fetch(`${URL}?page=${page}&limit=${limit}`);
    if (!response.ok) {
      throw new Error(`Ошибка сети: ${response.status}`);
    }
    const result = await response.json();
    return {
      data: result.data,
      total: result.total
    };
  },
  add: (task: Omit<Todo, 'id' | 'createdAt'>): Promise<Todo> => {
    const body = {
      text: task.text,
      completed: false
    };
    return fetch(URL, {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    }).then(res => {
      if (!res.ok) throw new Error('Ошибка при добавлении');
      return res.json();
    });
  },
  delete: (id: number): Promise<void> => {
    return fetch(`${URL}/${id.toString()}`, {
      method: 'DELETE'
    }).then(() => {});
  },
  toggle: (id: number): Promise<Todo> => {
    const idStr = id.toString();
    return fetch(`${URL}/${idStr}/toggle`, {
      method: 'PATCH',
      headers: headers
    }).then(res => {
      if (!res.ok) throw new Error('Ошибка при переключении');
      return res.json();
    });
  },
  update: (
    id: number,
    data: { text?: string; completed?: boolean }
  ): Promise<Todo> => {
    return fetch(`${URL}/${id.toString()}`, {
      method: 'PUT',
      headers: headers,
      body: JSON.stringify(data)
    }).then(res => {
      if (!res.ok) throw new Error('Ошибка при обновлении');
      return res.json();
    });
  }
};

import { Todo } from './types';

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
  add: async (task: Omit<Todo, 'id' | 'createdAt'>): Promise<Todo> => {
    const body = {
      text: task.text,
      completed: false
    };
    const response = await fetch(URL, {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    });
    if (!response.ok) {
      throw new Error('Ошибка при добавлении');
    }
    const result = await response.json();
    return result;
  },
  delete: async (id: number): Promise<void> => {
    const response = await fetch(`${URL}/${id.toString()}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error('Ошибка при удалении');
    }
  },
  toggle: async (id: number): Promise<Todo> => {
    const response = await fetch(`${URL}/${id.toString()}/toggle`, {
      method: 'PATCH',
      headers: headers
    });
    if (!response.ok) {
      throw new Error('Ошибка при смене complteted');
    }
    const result = await response.json();
    return result;
  },
  update: async (
    id: number,
    data: { text?: string; completed?: boolean }
  ): Promise<Todo> => {
    const response = await fetch(`${URL}/${id.toString()}`, {
      method: 'PUT',
      headers: headers,
      body: JSON.stringify(data)
    });
    if (!response.ok) {
      throw new Error('Ошибка при обновлении');
    }
    const result = await response.json();
    return result;
  }
};

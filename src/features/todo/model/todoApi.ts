import { Todo } from './types';

const URL = 'http://localhost:3001/todos';

// Общая функция для запросов с авторизацией
const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('accessToken'); // получаем токен из localStorage
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` })
  };

  const response = await fetch(url, {
    ...options,
    headers: {
      ...headers,
      ...(options.headers || {})
    }
  });

  if (!response.ok) {
    // можно дополнительно обработать ошибку, например, проверить статус 401
    throw new Error(`Ошибка сети: ${response.status}`);
  }
  return response.json();
};

// API для задач
export const todoApi = {
  getAll: async (params: { page: number; limit: number }) => {
    const { page, limit } = params;
    const url = `${URL}?page=${page}&limit=${limit}`;
    return await fetchWithAuth(url);
  },

  add: async (task: Omit<Todo, 'id' | 'createdAt'>) => {
    return await fetchWithAuth(URL, {
      method: 'POST',
      body: JSON.stringify(task)
    });
  },

  delete: async (id: number) => {
    await fetchWithAuth(`${URL}/${id}`, {
      method: 'DELETE'
    });
  },

  toggle: async (id: number) => {
    const response = await fetchWithAuth(`${URL}/${id}/toggle`, {
      method: 'PATCH'
    });
    return response;
  },

  update: async (id: number, data: { text?: string; completed?: boolean }) => {
    const response = await fetchWithAuth(`${URL}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
    return response;
  }
};

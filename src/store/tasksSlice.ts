import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { todoApi } from '../api/todoApi';
import { Todo, Filter } from '../features/todo/model/types';

interface TasksState {
  list: Todo[]; // полный список задач
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  total: number;
  totalPages: number;
  currentPage: number;
  limit: number;
  filter: Filter;
}

// Начальное состояние
const initialState: TasksState = {
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

// --- Асинхронные операции (thunks) ---

// Загрузка всех задач
export const fetchAllTasks = createAsyncThunk<
  { data: Todo[]; total: number }, // возвращаемые данные
  void,
  { rejectValue: string }
>('tasks/fetchAllTasks', async (_, { rejectWithValue }) => {
  try {
    const response = await todoApi.getAll({
      page: 1,
      limit: Number.MAX_SAFE_INTEGER
    });
    return { data: response.data, total: response.total };
  } catch (err) {
    return rejectWithValue('Ошибка при загрузке задач');
  }
});

// Добавление задачи
export const addTask = createAsyncThunk<
  Todo,
  { text: string; completed?: boolean }
>('tasks/addTask', async ({ text, completed = false }, thunkAPI) => {
  try {
    const newTask = await todoApi.add({ text, completed });
    return newTask;
  } catch (err) {
    return thunkAPI.rejectWithValue('Ошибка при добавлении задачи');
  }
});

// Удаление задачи
export const deleteTaskAsync = createAsyncThunk<void, number>(
  'tasks/deleteTaskAsync',
  async (id, thunkAPI) => {
    try {
      await todoApi.delete(id);
    } catch (err) {
      return thunkAPI.rejectWithValue('Ошибка при удалении');
    }
  }
);

// Переключение статуса выполнения задачи
export const toggleTaskAsync = createAsyncThunk<Todo, number>(
  'tasks/toggleTaskAsync',
  async (id, thunkAPI) => {
    try {
      const task = await todoApi.toggle(id);
      return task;
    } catch (err) {
      return thunkAPI.rejectWithValue('Ошибка при переключении');
    }
  }
);
export const fetchTasks = createAsyncThunk<
  { data: Todo[]; total: number },
  { page: number; limit: number },
  { rejectValue: string }
>('tasks/fetchTasks', async ({ page, limit }, thunkAPI) => {
  try {
    const response = await todoApi.getAll({ page, limit });
    return { data: response.data, total: response.total };
  } catch (err) {
    return thunkAPI.rejectWithValue('Ошибка при загрузке задач');
  }
});
// Обновление задачи (текст или статус)
export const updateTaskAsync = createAsyncThunk<
  Todo,
  { id: number; text?: string; completed?: boolean }
>('tasks/updateTaskAsync', async ({ id, text, completed }, thunkAPI) => {
  try {
    const task = await todoApi.update(id, { text, completed });
    return task;
  } catch (err) {
    return thunkAPI.rejectWithValue('Ошибка при обновлении');
  }
});

// --- Слайс ---
const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setLimit(state, action: PayloadAction<number>) {
      state.limit = action.payload;
      // Обновляем totalPages при изменении лимита
      if (action.payload === -1) {
        state.totalPages = 1; // показывать все одним списком
      } else {
        state.totalPages = Math.ceil(state.total / state.limit);
      }
      // Сброс страницы
      state.currentPage = 1;
    },
    setFilter(state, action: PayloadAction<Filter>) {
      state.filter = action.payload;
      state.currentPage = 1;
    },
    toggleTask(state, action: PayloadAction<number>) {
      const task = state.list.find(t => t.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
    deleteTask(state, action: PayloadAction<number>) {
      state.list = state.list.filter(t => t.id !== action.payload);
      state.total = state.list.length;
      if (state.limit !== -1) {
        state.totalPages = Math.ceil(state.total / state.limit);
      } else {
        state.totalPages = 1;
      }
      if (state.currentPage > state.totalPages) {
        state.currentPage = state.totalPages;
      }
    },
    updateTask(state, action: PayloadAction<{ id: number; text: string }>) {
      const task = state.list.find(t => t.id === action.payload.id);
      if (task) {
        task.text = action.payload.text;
      }
    }
  },
  extraReducers: builder => {
    // Загрузка всех задач
    builder
      .addCase(fetchAllTasks.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchAllTasks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload.data;
        state.total = action.payload.total;
        if (state.limit === -1) {
          state.totalPages = 1;
        } else {
          state.totalPages = Math.ceil(state.total / state.limit);
        }
        if (state.currentPage > state.totalPages) {
          state.currentPage = state.totalPages;
        }
      })
      .addCase(fetchAllTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Ошибка загрузки задач';
      })

      // Добавление задачи
      .addCase(addTask.fulfilled, (state, action) => {
        state.list.unshift(action.payload);
        state.total++;
        if (state.limit !== -1) {
          state.totalPages = Math.ceil(state.total / state.limit);
        } else {
          state.totalPages = 1;
        }
      })

      // Удаление задачи
      .addCase(deleteTaskAsync.fulfilled, (state, action) => {
        state.list = state.list.filter(t => t.id !== action.meta.arg);
        state.total = state.list.length;
        if (state.limit !== -1) {
          state.totalPages = Math.ceil(state.total / state.limit);
        } else {
          state.totalPages = 1;
        }
        if (state.currentPage > state.totalPages) {
          state.currentPage = state.totalPages;
        }
      })

      // Переключение статуса
      .addCase(toggleTaskAsync.fulfilled, (state, action) => {
        const index = state.list.findIndex(t => t.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })

      // Обновление задачи
      .addCase(updateTaskAsync.fulfilled, (state, action) => {
        const index = state.list.findIndex(t => t.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      });
  }
});

export const {
  setPage,
  setLimit,
  setFilter,
  toggleTask,
  deleteTask,
  updateTask
} = tasksSlice.actions;

export default tasksSlice.reducer;

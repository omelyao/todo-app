import { configureStore } from '@reduxjs/toolkit';
import todoSlice from '../features/todo/model/todoSlice';
import authSlice from '../features/auth/model/authSlice';

export const store = configureStore({
  reducer: {
    tasks: todoSlice,
    auth: authSlice
  }
});

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

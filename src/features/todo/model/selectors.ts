import { RootState } from '../../../store/index';
export const getAllTasks = (state: RootState) => state.tasks.list ?? [];
export const getTasks = (state: RootState) => state.tasks;

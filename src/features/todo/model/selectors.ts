import { State } from '../../../store/index';
export const getAllTasks = (state: State) => state.tasks.list ?? [];
export const getTasks = (state: State) => state.tasks;

import { useEffect, useMemo } from 'react';
import { Header } from '../shared/UI/Header';
import { TodoItem } from '../features/todo/ui/TodoItem';
import { AddTodo } from '../features/todo/ui/AddTodo';
import { SortAndFilterTodo } from '../features/todo/ui/SortAndFilterTodo';
import { Pagination } from '../features/todo/ui/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAllTasks,
  fetchTasks,
  deleteTaskAsync,
  updateTaskAsync,
  toggleTaskAsync
} from '../features/todo/model/tasksSlice';
import { AppDispatch } from '../features/todo/model/index';
import { getAllTasks, getTasks } from '../features/todo/model/selectors';
import styled from 'styled-components';

const StyledApp = styled.div`
  min-height: 100vh;
  width: 800px;
  padding-top: 2rem;
  background-color: ${props => props.theme.body};
  color: ${props => props.theme.color};
`;

function TodoPage() {
  const dispatch = useDispatch<AppDispatch>();
  const allTasks = useSelector(getAllTasks);
  const { status, currentPage, limit, filter } = useSelector(getTasks);
  // Получение полного списка задач при первой загрузке
  useEffect(() => {
    dispatch(fetchAllTasks()); // грузим все задачи
  }, []);

  // После получения полного списка задач, делать запрос задач по текущей странице
  useEffect(() => {
    dispatch(fetchTasks({ page: currentPage, limit }));
  }, [currentPage, limit, dispatch]);

  // Удалить задачу
  const deleteTaskHandler = (id: number) => {
    dispatch(deleteTaskAsync(id));
  };
  // Обновить задачу
  const updateTaskHandler = (id: number, newText: string) => {
    dispatch(updateTaskAsync({ id, text: newText }));
  };

  // Переключить завершенность
  const toggleCompleteTask = (id: number) => {
    dispatch(toggleTaskAsync(id));
  };
  // Мемоизация сортировки и фильтрации по всему списку задач
  const sortedAndFilteredTasks = useMemo(() => {
    let arr = [...allTasks];

    // сортировка
    if (filter.sortDate === 'newest') {
      arr.sort((a, b) => b.createdAt - a.createdAt);
    } else if (filter.sortDate === 'oldest') {
      arr.sort((a, b) => a.createdAt - b.createdAt);
    }

    // фильтрация
    if (filter.status === 'completed') {
      arr = arr.filter(task => task.completed);
    } else if (filter.status === 'notCompleted') {
      arr = arr.filter(task => !task.completed);
    }

    return arr;
  }, [allTasks, filter]);

  const totalFilteredTasksCount = useMemo(() => {
    return sortedAndFilteredTasks.length;
  }, [sortedAndFilteredTasks]);

  const totalPages = useMemo(() => {
    if (limit === -1) return 1;
    return Math.ceil(totalFilteredTasksCount / limit);
  }, [totalFilteredTasksCount, limit]);

  const paginatedTasks = useMemo(() => {
    if (limit === -1) return sortedAndFilteredTasks;
    const startIndex = (currentPage - 1) * limit;
    return sortedAndFilteredTasks.slice(startIndex, startIndex + limit);
  }, [sortedAndFilteredTasks, currentPage, limit]);

  return (
    <StyledApp>
      <Header />
      <section id="center">
        <SortAndFilterTodo filter={filter} limit={limit} />
        <hr />
        {status === 'loading' ? (
          <p>Загрузка...</p>
        ) : (
          paginatedTasks.map((task, index) => (
            <TodoItem
              key={task.id}
              number={(currentPage - 1) * limit + index + 1}
              task={task}
              toggleComplete={toggleCompleteTask}
              deleteTask={deleteTaskHandler}
              updateTask={updateTaskHandler}
            />
          ))
        )}
        <AddTodo />
        <Pagination totalPages={totalPages} page={currentPage} />
      </section>
    </StyledApp>
  );
}

export { TodoPage };

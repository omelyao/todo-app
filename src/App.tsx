import { useState, useEffect, useMemo } from 'react';
import { Header } from './shared/components/Header';
import { TodoItem } from './features/todo/ui/TodoItem';
import { AddTodo } from './features/todo/ui/AddTodo';
import { SortAndFilterTodo } from './features/todo/ui/SortAndFilterTodo';
import { useTheme } from './theme/themeContext';
import { MySelect } from './shared/components/MySelect';
import { Pagination } from './features/pagination/Pagination';
import { Filter } from './features/todo/model/types';

import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAllTasks,
  fetchTasks, // экшен для получения полного списка задач
  setPage,
  setLimit,
  setFilter,
  addTask,
  deleteTaskAsync,
  updateTaskAsync,
  toggleTaskAsync
} from './store/tasksSlice';
import { RootState } from './store/index';
import { AppDispatch } from './store/index';

import styled from 'styled-components';

const StyledApp = styled.div`
  min-height: 100vh;
  width: 800px;
  padding-top: 2rem;
  background-color: ${props => props.theme.body};
  color: ${props => props.theme.color};
`;

function App() {
  const { toggleTheme, theme } = useTheme();
  const isDarkTheme = theme === 'dark';

  const dispatch = useDispatch<AppDispatch>();

  // Весь список задач
  const allTasks = useSelector((state: RootState) => state.tasks.list ?? []);
  // Текущие задачи на странице
  const tasksPage = useSelector((state: RootState) => state.tasks.list);
  const { status, total, currentPage, limit, filter, totalPages } = useSelector(
    (state: RootState) => state.tasks
  );

  // Получение полного списка задач при первой загрузке
  useEffect(() => {
    dispatch(fetchAllTasks()); // грузим все задачи
  }, [dispatch]);

  // После получения полного списка задач, делать запрос задач по текущей странице
  useEffect(() => {
    dispatch(fetchTasks({ page: currentPage, limit }));
  }, [currentPage, limit, dispatch]);

  // Создать задачу
  const createTask = async (task: { text: string }) => {
    try {
      await dispatch(addTask({ text: task.text }));
    } catch (error) {
      console.error('Ошибка при добавлении задачи:', error);
    }
  };

  // Удалить задачу
  const deleteTaskHandler = async (id: number) => {
    try {
      await dispatch(deleteTaskAsync(id));
    } catch (error) {
      console.error('Ошибка при удалении задачи:', error);
    }
  };

  // Обновить задачу
  const updateTaskHandler = async (id: number, newText: string) => {
    try {
      await dispatch(updateTaskAsync({ id, text: newText }));
    } catch (error) {
      console.error('Ошибка при обновлении задачи:', error);
    }
  };

  // Переключить завершенность
  const toggleCompleteTask = async (id: number) => {
    try {
      await dispatch(toggleTaskAsync(id));
    } catch (error) {
      console.error('Ошибка при переключении задачи:', error);
    }
  };

  // Обработчик смены страницы
  const handlePageChange = (newPage: number) => {
    dispatch(setPage(newPage));
  };

  // Обработчик изменения лимита
  const handleLimitChange = (newLimit: number) => {
    dispatch(setLimit(newLimit));
    dispatch(setPage(1));
  };

  // Обработчик фильтрации
  const handleFilterChange = (newFilter: Filter) => {
    dispatch(setFilter(newFilter));
    dispatch(setPage(1));
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

  // пагинация - показываем только текущие задачи
  const paginatedTasks = useMemo(() => {
    if (limit === -1) return sortedAndFilteredTasks;
    const startIndex = (currentPage - 1) * limit;
    return sortedAndFilteredTasks.slice(startIndex, startIndex + limit);
  }, [sortedAndFilteredTasks, currentPage, limit]);

  return (
    <StyledApp>
      <div>Количество задач для отображения: {paginatedTasks.length}</div>
      <Header
        toggleTheme={toggleTheme}
        themeType={isDarkTheme ? 'dark' : 'light'}
      />

      <section id="center">
        <SortAndFilterTodo filter={filter} setFilter={handleFilterChange} />

        {/* Выбор лимита элементов на странице */}
        <MySelect
          defaultValue="Кол-во элементов на странице"
          value={limit}
          onChange={value => {
            const numValue = typeof value === 'string' ? Number(value) : value;
            handleLimitChange(numValue);
          }}
          options={[
            { value: 5, name: '5' },
            { value: 10, name: '10' },
            { value: 15, name: '15' },
            { value: -1, name: 'Показать все' }
          ]}
        />

        <hr />

        {/* Отображение задач */}
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

        {/* Добавление задачи */}
        <AddTodo create={createTask} />

        {/* Пагинация */}
        <Pagination
          totalPages={totalPages}
          page={currentPage}
          changePage={handlePageChange}
        />
      </section>
    </StyledApp>
  );
}

export { App };

import React from 'react';
import { useDispatch } from 'react-redux';
import { setFilter, setLimit, setPage } from '../model/tasksSlice';
import { Filter } from '../model/types';
import { PageLimitSelector } from './PageLimitSelector';

interface SortAndFilterTodoProps {
  filter: Filter;
  limit: number;
}

const SortAndFilterTodo: React.FC<SortAndFilterTodoProps> = ({
  filter,
  limit
}) => {
  const dispatch = useDispatch();

  const handleStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    dispatch(
      setFilter({
        ...filter,
        status:
          value === 'all' ? undefined : (value as 'completed' | 'notCompleted')
      })
    );
    dispatch(setPage(1));
  };

  const handleSortDate = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as 'newest' | 'oldest';
    dispatch(
      setFilter({
        ...filter,
        sortDate: value
      })
    );
    dispatch(setPage(1));
  };

  const handleLimit = (newLimit: number) => {
    dispatch(setLimit(newLimit));
    dispatch(setPage(1));
  };

  return (
    <div>
      {/* Выбор фильтрации по статусу */}
      <select value={filter.status ?? 'all'} onChange={handleStatus}>
        <option value="all">Все задачи</option>
        <option value="completed">Готовые задачи</option>
        <option value="notCompleted">Неготовые задачи</option>
      </select>

      {/* Выбор сортировки по дате */}
      <select value={filter.sortDate} onChange={handleSortDate}>
        <option value="" disabled>
          Сортировка по дате
        </option>
        <option value="newest">Новые сначала</option>
        <option value="oldest">Старые сначала</option>
      </select>

      {/* Выбор лимита элементов на странице */}
      <PageLimitSelector value={limit} onChange={handleLimit} />
    </div>
  );
};

export { SortAndFilterTodo };

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter, setLimit, setPage } from '../model/todoSlice';
import { SortOrder } from '../model/types';
import { getTasks } from '../model/selectors';
import { PageLimitSelector } from './PageLimitSelector';

const SortAndFilterTodo: React.FC = () => {
  const dispatch = useDispatch();
  const { filter, limit } = useSelector(getTasks);
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
    const value = e.target.value as SortOrder;
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

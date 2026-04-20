import React from "react";

const SortAndFilterTodo = ({ filter, setFilter }) => {
  return (
    <div>

      {/* Выбор фильтрации по статусу */}
      <select
        value={filter.status}
        onChange={(e) => setFilter({ ...filter, status: e.target.value })}
      >
        <option value="all">Все задачи</option>
        <option value="completed">Готовые задачи</option>
        <option value="notCompleted">Неготовые задачи</option>
      </select>

      {/* Выбор сортировки по дате */}
      <select
        value={filter.sortDate}
        onChange={(e) => setFilter({ ...filter, sortDate: e.target.value })}
      >
        <option value="" disabled>Сортировка по дате</option>
        <option value="newest">Новые сначала</option>
        <option value="oldest">Старые сначала</option>
      </select>
      <hr style={{ margin: '15px 0' }} />
    </div>
  );
};

export default SortAndFilterTodo;
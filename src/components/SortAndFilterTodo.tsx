import React from "react";
import { SortAndFilterTodoProps } from "../types";

const SortAndFilterTodo: React.FC<SortAndFilterTodoProps> = ({
  filter,
  setFilter,
}) => {
  return (
    <div>
      {/* Выбор фильтрации по статусу */}
      <select
        value={filter.status ?? "all"}
        onChange={(e) => {
          const value = e.target.value;
          setFilter((prev) => ({
            ...prev,
            status:
              value === "all"
                ? undefined
                : (value as "completed" | "notCompleted"),
          }));
        }}
      >
        <option value="all">Все задачи</option>
        <option value="completed">Готовые задачи</option>
        <option value="notCompleted">Неготовые задачи</option>
      </select>

      {/* Выбор сортировки по дате */}
      <select
        value={filter.sortDate}
        onChange={(e) => {
          const value = e.target.value as "newest" | "oldest";
          setFilter((prev) => ({
            ...prev,
            sortDate: value,
          }));
        }}
      >
        <option value="" disabled>
          Сортировка по дате
        </option>
        <option value="newest">Новые сначала</option>
        <option value="oldest">Старые сначала</option>
      </select>
      <hr />
    </div>
  );
};

export { SortAndFilterTodo };

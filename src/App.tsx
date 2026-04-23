import { useState } from "react";
import styled from "styled-components";

import { Header } from "./components/Header/Header";
import { TodoItem } from "./components/TodoItem";
import { AddTodo } from "./components/AddTodo";
import { SortAndFilterTodo } from "./components/SortAndFilterTodo";
import { getFromLocalStorage, setToLocalStorage } from "./utils/localStorage";
import { Todo, Filter } from "./types";
import { useTheme } from "./utils/themeContext";

const StyledApp = styled.div`
  min-height: 100vh;
  width: 800px;
  padding-top: 2rem;
  background-color: ${(props) => props.theme.body};
  color: ${(props) => props.theme.color};
`;

function App() {
  const { toggleTheme, theme } = useTheme(); // получаем из контекста
  const isDarkTheme = theme === "dark";

  // Инициализация задач
  const getInitialTasks = (): Todo[] => {
    const storedTasks = getFromLocalStorage<Todo[]>("tasks");
    return (
      storedTasks ?? [
        {
          id: 1,
          text: "Создать список с задачами",
          completed: false,
          createdAt: Date.now(),
        },
      ]
    );
  };

  const [tasks, setTasks] = useState<Todo[]>(getInitialTasks);
  const [filter, setFilter] = useState<Filter>({
    status: undefined,
    sortDate: "newest",
  });

  // Создать задачу
  const createTask = (task: { text: string }) => {
    const newTodo: Todo = {
      id: Date.now(),
      text: task.text,
      completed: false,
      createdAt: Date.now(),
    };
    const newTasks = [...tasks, newTodo];
    setTasks(newTasks);
    setToLocalStorage("tasks", newTasks);
  };

  // Удалить задачу
  const deleteTask = (id: number) => {
    const newTasks = tasks.filter((p) => p.id !== id);
    setTasks(newTasks);
    setToLocalStorage("tasks", newTasks);
  };

  // Обновить текст задачи
  const updateTask = (id: number, newText: string) => {
    const newTasks = tasks.map((task) =>
      task.id === id ? { ...task, text: newText } : task,
    );
    setTasks(newTasks);
    setToLocalStorage("tasks", newTasks);
  };

  // Переключить завершенность
  const toggleCompleteTask = (id: number) => {
    const newTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task,
    );
    setTasks(newTasks);
    setToLocalStorage("tasks", newTasks);
  };

  // Отсортировать и отфильтровать задачи
  const sortedAndFilteredTasks = (() => {
    let filtered = [...tasks];

    if (filter.status === "completed") {
      filtered = filtered.filter((task) => task.completed);
    } else if (filter.status === "notCompleted") {
      filtered = filtered.filter((task) => !task.completed);
    }

    if (filter.sortDate === "newest") {
      filtered.sort((a, b) => b.id - a.id);
    } else if (filter.sortDate === "oldest") {
      filtered.sort((a, b) => a.id - b.id);
    }

    return filtered;
  })();

  return (
    <StyledApp>
      <Header
        toggleTheme={toggleTheme}
        themeType={isDarkTheme ? "dark" : "light"}
      />
      <section id="center">
        <SortAndFilterTodo filter={filter} setFilter={setFilter} />
        {sortedAndFilteredTasks.map((task, index) => (
          <TodoItem
            key={task.id}
            number={index + 1}
            task={task}
            toggleComplete={toggleCompleteTask}
            deleteTask={deleteTask}
            updateTask={updateTask}
          />
        ))}
        <AddTodo create={createTask} />
      </section>
    </StyledApp>
  );
}

export { App };

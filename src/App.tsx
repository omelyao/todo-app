import { useState, useEffect, useMemo } from "react";
import { GlobalStyles } from "./main";
import { ThemeProvider, DefaultTheme } from "styled-components";
import styled from "styled-components";

import { Header } from "./components/Header/Header";
import { TodoItem } from "./components/TodoItem";
import { AddTodo } from "./components/AddTodo";
import { SortAndFilterTodo } from "./components/SortAndFilterTodo";
import { getFromLocalStorage, setToLocalStorage } from "./utils/localStorage";
import { Todo, Filter } from "./types";

const darkTheme: DefaultTheme = {
  body: "#1c1c1c",
  color: "white",
};
const lightTheme: DefaultTheme = {
  body: "white",
  color: "#1c1c1c",
};
const StyledApp = styled.div`
  min-height: 100vh;
  width: 100%;
  padding-top: 2rem;
  background-color: ${(props) => props.theme.body};
  color: ${(props) => props.theme.color};
`;

function App() {
  // задачи
  const [tasks, setTasks] = useState<Todo[]>(
    () =>
      getFromLocalStorage<Todo[]>("tasks") ?? [
        {
          id: 1,
          text: "Создать список с задачами",
          completed: false,
          createdAt: Date.now(),
        },
      ],
  );

  // фильтр
  const [filter, setFilter] = useState<Filter>({
    status: undefined,
    sortDate: "newest",
  });

  // тема
  const [theme, setTheme] = useState<"light" | "dark">(
    getFromLocalStorage<"light" | "dark">("theme") ?? "light",
  );

  const isDarkTheme = theme === "dark";

  const toggleTheme = () => {
    setTheme(isDarkTheme ? "light" : "dark");
  };

  // эффекты для сохранения темы и задач
  useEffect(() => {
    setToLocalStorage("theme", theme);
  }, [theme]);

  useEffect(() => {
    setToLocalStorage("tasks", tasks);
  }, [tasks]);

  // создание задачи
  const createTask = (task: { text: string }) => {
    const newTodo: Todo = {
      id: Date.now(),
      text: task.text,
      completed: false,
      createdAt: Date.now(),
    };
    setTasks([...tasks, newTodo]);
  };

  // удаление задачи
  const deleteTask = (id: number) => {
    setTasks(tasks.filter((p) => p.id !== id));
  };

  // обновление текста задачи
  const updateTask = (id: number, newText: string) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, text: newText } : task)),
    );
  };

  // переключение завершенности
  const toggleComplete = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  // сортировка и фильтрация
  const sortedAndFilteredTasks = useMemo<Todo[]>(() => {
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
  }, [filter.status, filter.sortDate, tasks]);

  return (
    <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <GlobalStyles />
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
              toggleComplete={toggleComplete}
              deleteTask={deleteTask}
              updateTask={updateTask}
            />
          ))}
          <AddTodo create={createTask} />
        </section>
      </StyledApp>
    </ThemeProvider>
  );
}

export { App };

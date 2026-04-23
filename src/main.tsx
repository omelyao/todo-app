import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { App } from "./App";
import { ThemeContext } from "./utils/themeContext"; // импортируем контекст

const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    min-height: 100vh;
    width: 100%;
    font-family: Arial, sans-serif;
    background-color: ${(props) => props.theme.body};
    color: ${(props) => props.theme.color};
  }
  #root {
    width: 800px;
    margin: 0 auto;
  }
  li {
    list-style-type: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .task {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 800px;
    border: 2px solid #007BFF;
    padding: 10px 5px;
    margin-bottom: 15px;
  }
  .task__content {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  .task__left {
    display: flex;
    align-items: center;
  }
  .task__right {
    display: flex;
    align-items: center;
  }
  .task__right button {
    margin-left: 10px; 
  }
  .task__checkbox {
    display: flex;
    align-items: center;
    margin-right: 15px;
  }
  select {
    margin-right: 1em;
  }
  hr {
    margin: 1em 0;
  }
  .task__text{
    overflow-wrap: break-word;
    word-break: break-word;
  }
`;

// Определение тем
const lightTheme = {
  body: "#ffffff",
  color: "#000000",
};

const darkTheme = {
  body: "#121212",
  color: "#ffffff",
};

const AppWrapper = () => {
  // Читаем тему из localStorage или устанавливаем по умолчанию "light"
  const [theme, setTheme] = React.useState<"light" | "dark">(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark" ? "dark" : "light"; // по умолчанию light
  });

  const toggleTheme = () => {
    setTheme((prev) => {
      const newTheme = prev === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme); // сохраняем в localStorage
      return newTheme;
    });
  };

  const themeStyles = theme === "dark" ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <ThemeProvider theme={themeStyles}>
        <GlobalStyle />
        <App />
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

root.render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>,
);

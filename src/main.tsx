import { createRoot } from 'react-dom/client'
import { ThemeProvider } from 'styled-components'
import App from './App'

// Импорт глобальных стилей
import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
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
`;

const theme = {
  body: '#fff',
  color: '#000',
};

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <ThemeProvider theme={theme}>
    <GlobalStyles />
    <App />
  </ThemeProvider>
);

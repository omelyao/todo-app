import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { Provider } from 'react-redux';
import { store } from './features/todo/model/index';
import { MyThemeProvider } from './entities/providers/MyThemeProvider';

const rootElement = document.getElementById('root')!;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <MyThemeProvider>
        <App />
      </MyThemeProvider>
    </Provider>
  </React.StrictMode>
);

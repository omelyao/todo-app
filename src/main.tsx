import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import { store } from './store/index';
import { MyThemeProvider } from './entities/providers/MyThemeProvider';
const rootElement = document.getElementById('root')!;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <MyThemeProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </MyThemeProvider>
    </Provider>
  </React.StrictMode>
);

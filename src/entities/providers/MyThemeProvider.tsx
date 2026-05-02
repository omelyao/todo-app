import React, { ReactNode, useState } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '../../features/todo/model/constants';
import { ThemeContext } from '../helpers/themeContext';
import { GlobalStyle } from '../helpers/GlobalStyles';

interface MyThemeProviderProps {
  children?: ReactNode; // не обязательно, если внутри добавляем конкретный контент
}
export const MyThemeProvider: React.FC<MyThemeProviderProps> = ({
  children
}) => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark' ? 'dark' : 'light';
  });

  const toggleTheme = () => {
    setTheme(prev => {
      const newTheme = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  };

  const themeStyles = theme === 'dark' ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <StyledThemeProvider theme={themeStyles}>
        <GlobalStyle />
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

import { useTheme } from '../../entities/helpers/themeContext';
import { MyButton } from './MyButton';
import styled from 'styled-components';

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Header: React.FC = () => {
  const { toggleTheme, theme } = useTheme();
  const isDarkTheme = theme === 'dark';
  const buttonText = theme === 'dark' ? 'Light' : 'Dark';
  return (
    <StyledHeader>
      <h1>Todo App</h1>
      <MyButton onClick={toggleTheme}>{buttonText}</MyButton>
    </StyledHeader>
  );
};

import { MyButton } from './MyButton';
import styled from 'styled-components';

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

interface HeaderProps {
  toggleTheme: () => void;
  themeType: 'light' | 'dark';
}
export const Header: React.FC<HeaderProps> = ({ toggleTheme, themeType }) => {
  const buttonText = themeType === 'dark' ? 'Light' : 'Dark';
  return (
    <StyledHeader>
      <h1>Todo App</h1>
      <MyButton onClick={toggleTheme}>{buttonText}</MyButton>
    </StyledHeader>
  );
};

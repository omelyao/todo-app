import { useTheme } from '../../entities/helpers/themeContext';
import { MyButton } from './MyButton';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Header: React.FC = () => {
  const { toggleTheme, theme } = useTheme();
  const buttonText = theme === 'dark' ? 'Light' : 'Dark';
  const navigate = useNavigate();
  const handleProfileClick = () => {
    navigate('/profile');
  };
  return (
    <StyledHeader>
      <h1>Todo App</h1>
      <div>
        <MyButton onClick={handleProfileClick}>My Profile</MyButton>
        <MyButton onClick={toggleTheme}>{buttonText}</MyButton>
      </div>
    </StyledHeader>
  );
};

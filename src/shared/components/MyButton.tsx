import styled from 'styled-components';
const StyledButton = styled.button`
  background-color: #0056b3;
  color: #ffffff;
  padding: 5px 15px;
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;
  margin-left: 1em;
  &:hover {
    background-color: #ffffff;
    color: #0056b3;
  }
`;

interface MyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}
export const MyButton: React.FC<MyButtonProps> = ({ children, ...props }) => {
  return <StyledButton {...props}>{children}</StyledButton>;
};

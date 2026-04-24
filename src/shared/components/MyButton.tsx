import styled from 'styled-components';
import { MyButtonProps } from '../../features/todo/model/types';
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
export const MyButton: React.FC<MyButtonProps> = ({ children, ...props }) => {
  return <StyledButton {...props}>{children}</StyledButton>;
};

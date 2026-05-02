import styled from 'styled-components';

const StyledInput = styled.input`
  padding: 5px 15px;
  border: 1px solid #007bff;
  border-radius: 5px;
  color: #222222;
  font-size: 16px;
  width: 50%;
`;
interface MyInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}
export const MyInput: React.FC<MyInputProps> = props => {
  return <StyledInput {...props} />;
};

import styled from 'styled-components';
export const RegisterContainer = styled.div`
  max-width: 400px;
  margin: 100px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  color: black;
`;

export const RegisterTitle = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

export const RegisterDiv = styled.div`
  margin-bottom: 10px;
`;

export const RegisterLabel = styled.label`
  display: block;
  margin-bottom: 6px;
  font-weight: 600;
`;

export const RegisterInput = styled.input`
  width: 95%;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const RegisterButton = styled.button<{ disabled?: boolean }>`
  width: 100%;
  padding: 10px;
  background-color: ${props => (props.disabled ? '#ccc' : '#034286')};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  font-size: 16px;

  &:hover {
    background-color: ${props => (props.disabled ? '#ccc' : '#0263ca')};
  }
`;

export const Message = styled.p<{ success?: boolean }>`
  color: ${props => (props.success ? 'green' : 'red')};
  margin-top: 10px;
  text-align: center;
`;

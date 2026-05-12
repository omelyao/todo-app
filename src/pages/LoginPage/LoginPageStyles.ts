import styled from 'styled-components';

export const LoginContainer = styled.div`
  max-width: 400px;
  margin: 100px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  color: black;
`;

export const LoginTitle = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
`;

export const LoginLabel = styled.label`
  margin-bottom: 8px;
  font-weight: 600;
`;

export const LoginInput = styled.input`
  padding: 8px 12px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const LoginButton = styled.button`
  padding: 10px;
  background-color: #034286;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #0263ca;
  }
`;

export const RegisterBlock = styled.div`
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ErrorMessage = styled.p`
  color: red;
  text-align: center;
`;

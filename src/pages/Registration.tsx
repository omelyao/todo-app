import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../features/todo/model/authSlice';
import { AppDispatch } from '../features/todo/model';
const Container = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  color: black;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const FieldWrapper = styled.div`
  margin-bottom: 10px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 6px;
  font-weight: 600;
`;

const Input = styled.input`
  width: 95%;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button<{ disabled?: boolean }>`
  width: 100%;
  padding: 10px;
  background-color: ${props => (props.disabled ? '#ccc' : '#007bff')};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  font-size: 16px;

  &:hover {
    background-color: ${props => (props.disabled ? '#ccc' : '#0069d9')};
  }
`;

const Message = styled.p<{ success?: boolean }>`
  color: ${props => (props.success ? 'green' : 'red')};
  margin-top: 10px;
  text-align: center;
`;

export const Registration: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState<string | undefined>(undefined);

  // Получаем статус и ошибку из Redux
  const status = useSelector((state: any) => state.auth.status);
  const error = useSelector((state: any) => state.auth.error);
  const successMsg = useSelector((state: any) =>
    state.auth.user ? 'Успешно зарегистрировано!' : null
  ); // или можно управлять локально

  const handleRegister = () => {
    // вызываем thunk
    dispatch(
      registerUser({ email, password, age: age ? parseInt(age) : undefined })
    );
  };

  return (
    <Container>
      <Title>Register</Title>
      <FieldWrapper>
        <Label>Email:</Label>
        <Input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </FieldWrapper>
      <FieldWrapper>
        <Label>Password:</Label>
        <Input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </FieldWrapper>
      <FieldWrapper>
        <Label>Age (optional):</Label>
        <Input
          type="number"
          value={age}
          onChange={e => setAge(e.target.value)}
        />
      </FieldWrapper>
      <Button onClick={handleRegister} disabled={status === 'loading'}>
        {status === 'loading' ? 'Регистрация...' : 'Зарегистрироваться'}
      </Button>
      {error && <Message>{error}</Message>}
      {status === 'idle' && !error && successMsg && (
        <Message success>{successMsg}</Message>
      )}
    </Container>
  );
};

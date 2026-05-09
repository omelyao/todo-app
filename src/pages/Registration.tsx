import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../features/todo/model/authSlice';
import { AppDispatch } from '../features/todo/model';
const RegisterContainer = styled.div`
  max-width: 400px;
  margin: 100px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  color: black;
`;

const RegisterTitle = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const RegisterDiv = styled.div`
  margin-bottom: 10px;
`;

const RegisterLabel = styled.label`
  display: block;
  margin-bottom: 6px;
  font-weight: 600;
`;

const RegisterInput = styled.input`
  width: 95%;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const RegisterButton = styled.button<{ disabled?: boolean }>`
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
    <RegisterContainer>
      <RegisterTitle>Register</RegisterTitle>
      <RegisterDiv>
        <RegisterLabel>Email:</RegisterLabel>
        <RegisterInput
          type="email"
          value={email}
          placeholder="Введите ваш email"
          onChange={e => setEmail(e.target.value)}
        />
      </RegisterDiv>
      <RegisterDiv>
        <RegisterLabel>Пароль</RegisterLabel>
        <RegisterInput
          type="password"
          value={password}
          placeholder="Введите ваш пароль"
          onChange={e => setPassword(e.target.value)}
        />
      </RegisterDiv>
      <RegisterDiv>
        <RegisterLabel>Возвраст</RegisterLabel>
        <RegisterInput
          type="number"
          value={age}
          placeholder="Введите ваш возраст (не обязательное поле)"
          onChange={e => setAge(e.target.value)}
        />
      </RegisterDiv>
      <RegisterButton onClick={handleRegister} disabled={status === 'loading'}>
        {status === 'loading' ? 'Регистрация...' : 'Зарегистрироваться'}
      </RegisterButton>
      {error && <Message>{error}</Message>}
      {status === 'idle' && !error && successMsg && (
        <Message success>{successMsg}</Message>
      )}
    </RegisterContainer>
  );
};

import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../features/todo/model/index';
import { loginUser } from '../features/todo/model/authSlice';
import { Header } from '../shared/UI/Header';
const LoginContainer = styled.div`
  max-width: 400px;
  margin: 100px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  color: black;
`;

const LoginTitle = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const LoginLabel = styled.label`
  margin-bottom: 8px;
  font-weight: 600;
`;

const LoginInput = styled.input`
  padding: 8px 12px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const LoginButton = styled.button`
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
const RegisterBlock = styled.div`
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const ErrorMessage = styled.p`
  color: red;
  text-align: center;
`;

const Login: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await dispatch(loginUser({ email, password })).unwrap();
    } catch (err) {
      setError('Неверные данные или ошибка сервера');
    } finally {
      setLoading(false);
    }
  };
  const navigate = useNavigate();
  const handleRegistration = () => {
    navigate('/register');
  };
  return (
    <LoginContainer>
      <LoginTitle>Войти в аккаунт</LoginTitle>
      <LoginForm onSubmit={handleSubmit}>
        <LoginLabel>Email</LoginLabel>
        <LoginInput
          id="email"
          type="email"
          placeholder="Введите ваш email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />

        <LoginLabel>Пароль</LoginLabel>
        <LoginInput
          id="password"
          type="password"
          placeholder="Введите ваш пароль"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <LoginButton type="submit" disabled={loading}>
          {loading ? 'Загрузка...' : 'Войти в аккаунт'}
        </LoginButton>
        <RegisterBlock>
          <LoginLabel>Нет акаунта?</LoginLabel>
          <LoginButton type="button" onClick={handleRegistration}>
            Зарегистрироваться
          </LoginButton>
        </RegisterBlock>
      </LoginForm>
    </LoginContainer>
  );
};

export { Login };

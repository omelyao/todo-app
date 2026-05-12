import React, { useState } from 'react';
import {
  LoginContainer,
  LoginTitle,
  LoginForm,
  LoginLabel,
  LoginInput,
  LoginButton,
  RegisterBlock,
  ErrorMessage
} from './LoginPageStyles';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../store/index';
import { loginUser } from '../../features/auth/model/authSlice';

const LoginPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

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

export { LoginPage };

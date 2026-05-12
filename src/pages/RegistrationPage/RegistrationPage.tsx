import React, { useState } from 'react';
import {
  RegisterContainer,
  RegisterButton,
  RegisterDiv,
  RegisterInput,
  RegisterLabel,
  RegisterTitle,
  Message
} from './RegistrationPageStyles';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../features/auth/model/authSlice';
import { AppDispatch } from '../../store/index';

const RegistrationPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
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
export { RegistrationPage };

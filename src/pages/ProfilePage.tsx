import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile, logoutUser } from '../features/auth/model/authSlice';
import { AppDispatch } from '../store/index';
import { useNavigate } from 'react-router-dom';
import { ChangePassword } from '../features/todo/ui/ChangePassword';
const Container = styled.div`
  max-width: 500px;
  margin: 50px auto;
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

const InfoItem = styled.div`
  margin-bottom: 12px;
`;

const Label = styled.span`
  font-weight: 600;
`;

const Value = styled.span`
  margin-left: 8px;
`;

const Button = styled.button`
  display: block;
  width: 100%;
  padding: 10px;
  margin-top: 20px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #c82333;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
  margin-top: 20px;
`;

const ProfilePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  // Получение данных из Redux
  const user = useSelector((state: any) => state.auth.user);
  const status = useSelector((state: any) => state.auth.status);
  const error = useSelector((state: any) => state.auth.error);
  // Загружаем профиль при монтировании
  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logoutUser());
  };
  const handleToTasks = () => {
    navigate('/');
  };
  if (status === 'loading') {
    return <p style={{ textAlign: 'center' }}>Загрузка...</p>;
  }

  if (error) {
    return (
      <Container>
        <ErrorMessage>{error}</ErrorMessage>
        <Button onClick={handleLogout}>Выйти</Button>
      </Container>
    );
  }
  if (!user) {
    return null;
  }
  return (
    <Container>
      <Title>Профиль пользователя</Title>
      <InfoItem>
        <Label>Email:</Label>
        <Value>{user.email}</Value>
      </InfoItem>
      <InfoItem>
        <Label>Возраст:</Label>
        <Value>{user.age || 'Не указан'}</Value>
      </InfoItem>
      <InfoItem>
        <Label>Дата регистрации:</Label>
        <Value>{new Date(user.createdAt).toLocaleString()}</Value>
      </InfoItem>
      <ChangePassword />
      <Button onClick={handleLogout}>Выйти из аккаунта</Button>
      <Button onClick={handleToTasks}>К моим задачам</Button>
    </Container>
  );
};

export { ProfilePage };

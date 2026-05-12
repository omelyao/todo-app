import React, { useEffect } from 'react';
import {
  ProfileContainer,
  ProfileErrorMessage,
  ProfileButton,
  ProfileTitle,
  ProfileInfoItem,
  ProfileLabel,
  ProfileValue
} from './ProfilePageStyles';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchUserProfile,
  logoutUser
} from '../../features/auth/model/authSlice';
import { AppDispatch } from '../../store/index';
import { useNavigate } from 'react-router-dom';
import { ChangePassword } from '../../features/todo/ui/ChangePassword';

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
      <ProfileContainer>
        <ProfileErrorMessage>{error}</ProfileErrorMessage>
        <ProfileButton onClick={handleLogout}>Выйти</ProfileButton>
      </ProfileContainer>
    );
  }
  if (!user) {
    return null;
  }
  return (
    <ProfileContainer>
      <ProfileTitle>Профиль пользователя</ProfileTitle>
      <ProfileInfoItem>
        <ProfileLabel>Email:</ProfileLabel>
        <ProfileValue>{user.email}</ProfileValue>
      </ProfileInfoItem>
      <ProfileInfoItem>
        <ProfileLabel>Возраст:</ProfileLabel>
        <ProfileValue>{user.age || 'Не указан'}</ProfileValue>
      </ProfileInfoItem>
      <ProfileInfoItem>
        <ProfileLabel>Дата регистрации:</ProfileLabel>
        <ProfileValue>{new Date(user.createdAt).toLocaleString()}</ProfileValue>
      </ProfileInfoItem>
      <ChangePassword />
      <ProfileButton onClick={handleLogout}>Выйти из аккаунта</ProfileButton>
      <ProfileButton onClick={handleToTasks}>К моим задачам</ProfileButton>
    </ProfileContainer>
  );
};

export { ProfilePage };

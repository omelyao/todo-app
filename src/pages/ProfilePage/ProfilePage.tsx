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
import { ChangePassword } from '../../features/auth/ui/ChangePassword';
import {
  selectAuthError,
  selectAuthStatus,
  selectAuthUser
} from '../../features/auth/model/authSelectors';
const ProfilePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  // Получение данных из Redux
  const user = useSelector(selectAuthUser);
  const status = useSelector(selectAuthStatus);
  const error = useSelector(selectAuthError);
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
        <ProfileValue>
          {user.createdAt
            ? new Date(user.createdAt).toLocaleString()
            : 'Не указано'}
        </ProfileValue>
      </ProfileInfoItem>
      <ChangePassword />
      <ProfileButton onClick={handleLogout}>Выйти из аккаунта</ProfileButton>
      <ProfileButton onClick={handleToTasks}>К моим задачам</ProfileButton>
    </ProfileContainer>
  );
};

export { ProfilePage };

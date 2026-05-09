import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { changePasswordThunk } from '../model/authSlice';
import { AppDispatch } from '../model';

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
  margin-top: 20px;
`;
const ChangePassword: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);
  const handleChangePassword = () => {
    setIsChangingPassword(true);
    setPasswordError(null);
    setPasswordSuccess(null);
    dispatch(changePasswordThunk({ oldPassword, newPassword }))
      .unwrap()
      .then(() => {
        alert('Пароль успешно изменен');
        setOldPassword('');
        setNewPassword('');
      })
      .catch(err => {
        setPasswordError(err || 'Ошибка при смене пароля');
      })
      .finally(() => {
        setIsChangingPassword(false);
      });
  };
  return (
    <div>
      <h3>Сменить пароль</h3>
      <div>
        <input
          type="password"
          placeholder="Текущий пароль"
          value={oldPassword}
          onChange={e => setOldPassword(e.target.value)}
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Новый пароль"
          value={newPassword}
          onChange={e => setNewPassword(e.target.value)}
        />
      </div>
      <button
        onClick={handleChangePassword}
        disabled={isChangingPassword || !oldPassword || !newPassword}
      >
        {isChangingPassword ? 'Обновление...' : 'Сменить пароль'}
      </button>

      {passwordError && <ErrorMessage>{passwordError}</ErrorMessage>}
      {passwordSuccess && <p style={{ color: 'green' }}>{passwordSuccess}</p>}
    </div>
  );
};
export { ChangePassword };

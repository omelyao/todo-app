import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { routes } from './routes/index';
import { useSelector } from 'react-redux';
import { RootState } from './features/todo/model/index';
import { NotFoundPage } from './pages/NotFoundPage';
export const App: React.FC = () => {
  const isAuthenticated = Boolean(
    useSelector((state: RootState) => state.auth.token)
  );

  return (
    <Routes>
      {/* Приватные маршруты */}
      {routes.private.map(route => (
        <Route
          key={route.path}
          path={route.path}
          element={
            isAuthenticated ? route.component : <Navigate to="/login" replace />
          }
        />
      ))}

      {/* Публичные маршруты */}
      {routes.public.map(route => (
        <Route
          key={route.path}
          path={route.path}
          element={
            !isAuthenticated ? route.component : <Navigate to="/" replace />
          }
        />
      ))}

      {/* Страница 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

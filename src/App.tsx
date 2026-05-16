import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { routes } from './routes/index';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from './features/auth/model/authSelectors';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
export const App: React.FC = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return (
    <Routes>
      {/* Приватные маршруты */}
      {routes.private.map(route => (
        <Route
          key={route.path}
          path={route.path}
          element={
            isAuthenticated ? (
              <route.component />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      ))}

      {/* Публичные маршруты */}
      {routes.public.map(route => (
        <Route
          key={route.path}
          path={route.path}
          element={
            !isAuthenticated ? <route.component /> : <Navigate to="/" replace />
          }
        />
      ))}

      {/* Страница 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

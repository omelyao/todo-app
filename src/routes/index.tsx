import { TodoPage } from '../pages/TodoPage';
import { LoginPage } from '../pages/LoginPage';
import { RegistrationPage } from '../pages/RegistrationPage';
import { ProfilePage } from '../pages/ProfilePage';
import { NotFoundPage } from '../pages/NotFoundPage';
export const routes = {
  private: [
    { path: '/', component: <TodoPage /> },
    { path: '/profile', component: <ProfilePage /> }
  ],
  public: [
    { path: '/login', component: <LoginPage /> },
    { path: '/register', component: <RegistrationPage /> },
    { path: '*', component: <NotFoundPage /> }
  ]
};

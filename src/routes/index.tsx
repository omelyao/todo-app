import { TodoPage } from '../pages/TodoPage/TodoPage';
import { LoginPage } from '../pages/LoginPage/LoginPage';
import { RegistrationPage } from '../pages/RegistrationPage/RegistrationPage';
import { ProfilePage } from '../pages/ProfilePage/ProfilePage';
export const routes = {
  private: [
    { path: '/', component: TodoPage },
    { path: '/profile', component: ProfilePage }
  ],
  public: [
    { path: '/login', component: LoginPage },
    { path: '/register', component: RegistrationPage }
  ]
};

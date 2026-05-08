import { TodoPage } from '../pages/TodoPage';
import { Login } from '../pages/Login';
import { Registration } from '../pages/Registration';
import { Profile } from '../pages/Profile';

export const routes = {
  private: [
    { path: '/', component: <TodoPage /> },
    { path: '/profile', component: <Profile /> }
  ],
  public: [
    { path: '/login', component: <Login /> },
    { path: '/register', component: <Registration /> }
  ]
};

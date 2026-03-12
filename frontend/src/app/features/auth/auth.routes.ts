import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { ForgotPassword } from './pages/forgot-password/forgot-password';
import { ResetPassword } from './pages/reset-password/reset-password';

export const AUTH_ROUTES: Routes = [
  {
    path: 'login',
    component: Login,
    title: 'Iniciar sesión',
  },
  {
    path: 'register',
    component: Register,
    title: 'Registrarse',
  },
  {
    path: 'forgot-password',
    component: ForgotPassword,
    title: 'Recuperar contraseña',
  },
  {
    path: 'reset-password/:token',
    component: ResetPassword,
    title: 'Restablecer contraseña',
  },
];

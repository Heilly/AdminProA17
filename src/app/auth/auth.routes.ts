import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { loginGuard } from '../guards/login.guard';

// import { AuthComponent } from './auth.component';

export const AUTH_ROUTES: Routes = [
  { path: 'login', 
    canActivate: [loginGuard],
    component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

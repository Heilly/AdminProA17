import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { Grafica1Component } from './pages/grafica1/grafica1.component';
import { NoPageFoundComponent } from './pages/404/404.component';
import { PagesComponent } from './pages/pages.component';
import { AUTH_ROUTES } from './auth/auth.routes';

export const routes: Routes = [
    { 
        path:'',
        loadChildren: () => import('./pages/pages.routes').then( r => r.PAGES_ROUTES )
    },
    ...AUTH_ROUTES,
    
    { path: '**', component: NoPageFoundComponent},
];

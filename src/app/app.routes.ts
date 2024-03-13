import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { Grafica1Component } from './pages/grafica1/grafica1.component';
import { NoPageFoundComponent } from './pages/404/404.component';
import { PagesComponent } from './pages/pages.component';

export const routes: Routes = [
    { 
        path: 'dashboard', 
        component: PagesComponent,
        children: [
            { path: '', component: DashboardComponent },
            { path: 'progress', component: ProgressComponent },
            { path: 'grafica1', component: Grafica1Component },
        ]
    },
    
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },

    {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
    {path: '**', component: NoPageFoundComponent},
];

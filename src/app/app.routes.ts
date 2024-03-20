import { Routes } from '@angular/router';
import { NoPageFoundComponent } from './pages/404/404.component';
import { AUTH_ROUTES } from './auth/auth.routes';
import { authCanActivatedGuard } from './guards/auth.guard';

export const routes: Routes = [
    { 
        path:'dashboard',
        canActivate: [authCanActivatedGuard],
        loadChildren: () => import('./pages/pages.routes').then( r => r.PAGES_ROUTES )
    },
    ...AUTH_ROUTES,
    
    { path:'', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: '**', component: NoPageFoundComponent},
];

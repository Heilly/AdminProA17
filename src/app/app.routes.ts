import { Routes } from '@angular/router';
import { NoPageFoundComponent } from './pages/404/404.component';
import { AUTH_ROUTES } from './auth/auth.routes';
import { authCanActivatedGuard } from './guards/auth.guard';
import { AboutmeComponent } from './pages/aboutme/aboutme.component';
import { adminGuard, adminGuardMatch } from './guards/admin.guard';

export const routes: Routes = [
    {
        path: 'aboutme',
        component: AboutmeComponent
    },
    { 
        path:'dashboard',
        canActivate: [authCanActivatedGuard],
        loadChildren: () => import('./pages/pages.routes').then( r => r.PAGES_ROUTES ),
        title: 'Dashboard'
    },
    ...AUTH_ROUTES,
    
    { path:'', redirectTo: 'aboutme', pathMatch: 'full' },
    { path: '**', component: NoPageFoundComponent},
];

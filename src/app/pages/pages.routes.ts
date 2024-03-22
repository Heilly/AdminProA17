import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { PagesComponent } from './pages.component';
import { PromiseComponent } from './promise/promise.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';

// import { PagesComponent } from './pages.component';

export const PAGES_ROUTES: Routes = [
  {
    path: '', 
        component: PagesComponent,
        children: [
          { path: '', component: DashboardComponent },
          { path: 'progress', component: ProgressComponent, title: 'Progress' },
          { path: 'promise', component: PromiseComponent, title: 'Promise' },
          { path: 'rxjs', component: RxjsComponent, title: 'RxJs' },
          { path: 'perfil', component: PerfilComponent, title: 'Perfil de Usuario' },
        ]
  }
];

import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { PagesComponent } from './pages.component';
import { PromiseComponent } from './promise/promise.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { adminGuard, adminGuardMatch } from '../guards/admin.guard';
import { HomeComponent } from './project/gifsApp/pages/home/home.component';

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

          //Busqueda
          { path: 'buscar/:termino', component: BusquedaComponent, title: 'Busquedas' },

          //Mantenimientos
          { path: 'hospitales', component: HospitalesComponent, title: 'Hospitales de Aplicacion' },
          { path: 'medicos', component: MedicosComponent, title: 'Medicos de Aplicacion' },
          { path: 'medico/:id', component: MedicoComponent, title: 'Editar Medico' },

          //Rutas Administrativas
          { path: 'usuarios',  
          canMatch: [adminGuardMatch],
          canActivate: [adminGuard],
          component: UsuariosComponent, title: 'Usarios de Aplicacion' },

          //Proyectos
          
          { path: 'gifs', component: HomeComponent, title: 'Gifs App'},

        ]
  }
];

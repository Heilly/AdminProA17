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

          //Mantenimientos
          { path: 'usuarios', component: UsuariosComponent, title: 'Usarios de Aplicacion' },
          { path: 'hospitales', component: HospitalesComponent, title: 'Hospitales de Aplicacion' },
          { path: 'medicos', component: MedicosComponent, title: 'Medicos de Aplicacion' },
          { path: 'medico/:id', component: MedicoComponent, title: 'Editar Medico' },

        ]
  }
];

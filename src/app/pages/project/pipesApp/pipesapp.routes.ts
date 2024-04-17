import { Routes } from '@angular/router';
import { BasicspageComponent } from './pages/basicspage/basicspage.component';
import { NumberspageComponent } from './pages/numberspage/numberspage.component';
import { UncommonpageComponent } from './pages/uncommonpage/uncommonpage.component';
import { OdersComponent } from './pages/oders/oders.component';

// import { PipesappComponent } from './pipesapp.component';

export const PIPESAPP_ROUTES: Routes = [
  {
    path: '',
    component: BasicspageComponent
  },
  {
    path: 'numbers',
    component: NumberspageComponent
  },
  {
    path: 'uncommon',
    component: UncommonpageComponent
  },
  {
    path: 'oders',
    component: OdersComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

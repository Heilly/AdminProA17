import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SidebarservService {
  // constructor() {}

  public menu = [];

  cargarMenu() {
   const menu = localStorage.getItem('menu');
   if(menu){
      return this.menu = JSON.parse( menu ) || [];
    }
  
    return [];
  }

  menu1 = signal( [ 
    {
      titulo: 'Dashboard',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Main', url: '/' },
        { titulo: 'rxjs', url: '/dashboard/rxjs' },
        { titulo: 'Promesas', url: '/dashboard/promise' },
        { titulo: 'ProgressBar', url: '/dashboard/progress' },
      ]
    },
    {
      titulo: 'Hospitales',
      icono: 'mdi mdi-folder-lock-open',
      submenu: [
        { titulo: 'Usuarios', url: 'usuarios' },
        { titulo: 'Hospitales', url: 'hospitales' },
        { titulo: 'Médicos', url: 'medicos' },
      ]
    },
    {
      titulo: 'Proyectos',
      icono: 'mdi mdi-widgets',
      submenu: [
        { titulo: 'Gifs App', url: 'gifs' },
        { titulo: 'Country SPA', url: 'country/by-capital' },
      ]
    },
  ])
}

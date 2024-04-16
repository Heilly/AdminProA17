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
        { titulo: 'rxjs', url: 'rxjs' },
        { titulo: 'Promesas', url: 'promise' },
        { titulo: 'ProgressBar', url: 'progress' },
      ]
    },
    {
      titulo: 'Mantenimientos',
      icono: 'mdi mdi-folder-lock-open',
      submenu: [
        { titulo: 'Usuarios', url: 'usuarios' },
        { titulo: 'Hospitales', url: 'hospitales' },
        { titulo: 'Médicos', url: 'medicos' },
      ]
    },
    {
      titulo: 'Proyectos',
      icono: 'mdi mdi-folder-lock-open',
      submenu: [
        { titulo: 'Gifs App', url: 'gifs' },
      ]
    },
  ])
}

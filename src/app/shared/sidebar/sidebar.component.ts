import { Component, computed, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { UsuarioservService } from '../../serivices/usuarioserv/usuarioserv.service';
import { UsuarioDB } from '../../interfaces/UsuarioDB.inetrface';
import { UsuarioModel } from '../../models/usuario.model';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  private usuarioServ = inject( UsuarioservService );
  private router = inject( Router );

  public usuario : UsuarioModel;

  constructor(){

    this.usuario = this.usuarioServ.usuario;
  }

  logout(){
    this.usuarioServ.logout();
  }


  subMenuDashboard = [
    { url: '/dashboard/progress', title: 'Progress' },
    { url: '/dashboard/promise', title: 'Promise' },
    { url: '/dashboard/rxjs', title: 'RxJs' },

    
  ]


}
